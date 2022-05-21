const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require('path');

const Document = require('./../models/Document');
const User = require('./../models/User');
const Token = require('./../models/Token');
const Code = require('./../models/Code');

const sendMail = require('../functions/sendMail');
const validateSignup = require('../functions/validateSignup');

router.post('/track', async (req, res) => {
    try {
        const { trackingId } = req.body;

        const { documentId, name, visibility } = await Document.findOne({ trackingId });

        if (visibility == 'private') {
            res.send({ status: 'failed', message: "The searched document is private. So you can not track the document." });
            return;
        }

        res.send({ documentId, trackingId, name });
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validator.isEmail(email) || password == null || password == undefined) {
            res.send({ status: 'failed', message: "Invalid email address or password!" });
            return;
        }
        const dbUser = await User.findOne({ email }).exec();
        if (dbUser == null) {
            res.send({ status: 'failed', message: "User does not exist!" });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, dbUser.password);

        if (!passwordMatch) {
            res.send({ status: 'failed', message: "Wrong password!" });
            return;
        }
        if (dbUser.verified == false) {
            const mailOptions = {
                to: email,
                subject: "Please verify your email on ODTS.",
                text: `Hi ${dbUser.firstName} ${dbUser.lastName},\nPlease verify your account by clicking on the below link.\n${process.env.domainLink}verify/${dbUser.verificationId}`
            }
            sendMail(mailOptions);
            res.send({ status: 'failed', message: "User email is not verified. Verification link sent on your email." });
            return;
        }

        const userId = dbUser.userId;
        const sessionId = uuidv4();
        const tokenId = jwt.sign({ userId: dbUser.userId }, password);

        const newToken = new Token({ userId, sessionId, tokenId });
        await newToken.save();

        res.cookie('sessionId', sessionId, { maxAge: 259200000, httpOnly: true });
        res.cookie('tokenId', tokenId, { maxAge: 259200000, httpOnly: true });

        res.status(200).end();
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

router.get('/verify/:verificationId', async (req, res) => {
    try {
        const { verificationId } = req.params;
        const user = await User.findOneAndUpdate({ verificationId }, { $set: { verified: true } });
        if (user) res.sendFile(path.join(__dirname, 'htmls', 'verified.html'));
        else res.sendFile(path.join(__dirname, 'htmls', 'notverified.html'));
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

router.post('/customer-signup', validateSignup, async (req, res) => {
    try {
        const { role, firstName, lastName, email, phone, password } = req.body;

        const userId = uuidv4();
        const verificationId = uuidv4();
        const newUser = new User({ userId, role, firstName, lastName, email, phone, password, verificationId, verified: false });
        await newUser.save();

        let mailOptions = {
            to: email,
            subject: "Account created on ODTS.",
            text: `Hi ${firstName} ${lastName},\nYour account has been created on Office Document Tracking System. Your credentials are\n\nuserId = "${userId}"\nrole = "${role}"\nphone = "${phone}"\n\nPlease verify your account by clicking on the below link.\n${process.env.domainLink}verify/${verificationId}`
        }
        sendMail(mailOptions);

        res.status(201).end();
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

const gcStorage = new Storage({
    projectId: process.env.projectId,
    credentials: {
        client_email: process.env.clientEmail,
        private_key: process.env.privateKey
    }
});
const docsBucket = gcStorage.bucket(process.env.docsBucketName);

router.post('/officer-signup', validateSignup, async (req, res) => {
    try {
        const file = req.files.file;
        const { role, firstName, lastName, email, phone, password } = req.body;

        const documentId = uuidv4();
        const fileName = documentId + "_" + file.name;

        const blob = docsBucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('finish', async () => {
            const publicUrl = format(`https://storage.googleapis.com/${process.env.docsBucketName}/${blob.name}`);

            const userId = uuidv4();
            const verificationId = uuidv4();
            const newUser = new User({ userId, role, firstName, lastName, email, phone, password, verificationId, verified: false, officerVerified: false, publicUrl });
            await newUser.save();

            const mailOptions = {
                to: email,
                subject: "Account created on ODTS",
                text: `Your account has been created on Office Document Tracking System. Your credentials are\n\nuserId = "${userId}"\nrole = "${role}"\nfirstName = "${firstName}"\nlastName = "${lastName}"\nemail = "${email}"\nphone = "${phone}"\n`
            }
            sendMail(mailOptions);

            res.status(201).end();
        });
        blobStream.end(file.data);

    } catch (err) {
        console.log(err);
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

router.post('/admin-signup', validateSignup, async (req, res) => {
    try {
        const { role, firstName, lastName, email, phone, password, specialCode } = req.body;

        const codeExists = await Code.findOne({ email, specialCode }).exec();
        if (codeExists == null) {
            res.send({ status: 'failed', message: "Special code is not valid!" });
            return;
        }

        const userId = uuidv4();
        const verificationId = uuidv4();
        const newUser = new User({ userId, role, firstName, lastName, email, phone, password, verificationId, verified: false });
        await newUser.save();

        let mailOptions = {
            to: email,
            subject: "Account created on ODTS.",
            text: `Hi ${firstName} ${lastName},\nYour account has been created on Office Document Tracking System. Your credentials are\n\nuserId = "${userId}"\nrole = "${role}"\nphone = "${phone}"\n\nPlease verify your account by clicking on the below link.\n${process.env.domainLink}verify/${verificationId}`
        }
        sendMail(mailOptions);

        res.status(201).end();
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
});

module.exports = router;
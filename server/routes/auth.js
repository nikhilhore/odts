const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require('path');

const Document = require('./../models/Document');
const Token = require('./../models/Token');
const Code = require('./../models/Code');

const sendMail = require('./../functions/sendMail');

const gcStorage = new Storage({
    projectId: process.env.projectId,
    credentials: {
        client_email: process.env.clientEmail,
        private_key: process.env.privateKey
    }
});
const docsBucket = gcStorage.bucket(process.env.docsBucketName);

router.post('/createDocument', async (req, res) => {
    try {
        const file = req.files.file;
        const { userId, email, name, visibility } = req.body;

        const documentId = uuidv4();
        const fileName = documentId + "_" + file.name;

        const blob = docsBucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('finish', async () => {
            const publicUrl = format(`https://storage.googleapis.com/${process.env.docsBucketName}/${blob.name}`);

            const payload = { documentId, userId, name, visibility, publicUrl };
            const newDocument = new Document(payload);
            await newDocument.save();

            const mailOptions = {
                to: email,
                subject: "Document created on ODTS",
                text: `Your document has been created on Office Document Tracking System. Your credentials are\n\npublicUrl = "${publicUrl}"\nvisibility = "${visibility}"\nname = "${name}"\n`
            }
            sendMail(mailOptions);

            res.status(201).end();
        });
        blobStream.end(file.data);

    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/downloadDocument', async (req, res) => {
    try {
        const { documentId, userId } = req.body;
        const { publicUrl } = await Document.findOne({ documentId, userId }).exec();
        res.download("./package.json");
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/trackdocument', async (req, res) => {
    try {
        const { documentId, userId } = req.body;

        const document = await Document.findOne({ documentId, userId }).exec();

        res.send({ document });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/mydocuments', async (req, res) => {
    try {
        const { userId } = req.body;
        const documents = await Document.find({ userId }).exec();
        res.send({ documents });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/submitdocument', async (req, res) => {
    try {
        const { documentId, officeId } = req.body;

        if (documentId === undefined || documentId === "") {
            throw new Error("Invalid document Id");
        } else if (officeId === undefined || officeId === "") {
            throw new Error("Invalid office Id");
        }

        const document = await Document.findOne({ documentId });

        if (document === null) {
            throw new Error("No document found with the given document Id");
        }
        document.offices = [{ officeId, status: null }];
        await document.save();

        res.end();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/alldocuments', async (req, res) => {
    try {
        const { userId } = req.body;
        const documents = await Document.find({ userId }).exec();
        res.send({ documents });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/generatecode', async (req, res) => {
    try {
        const { email } = req.body;
        if (email == undefined || email == '') throw new Error('Please enter a valid email address!');
        const oldCode = await Code.findOne({ email });
        if (oldCode !== null) {
            res.send({ specialCode: oldCode.specialCode });
            return;
        }
        const specialCode = uuidv4();
        await new Code({ specialCode, email }).save();
        res.send({ specialCode });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.get('/logout', async (req, res) => {
    try {
        const { sessionId } = req.cookies;
        res.clearCookie('sessionId');
        res.clearCookie('tokenId');
        await Token.findOneAndDelete({ sessionId }).exec();
        res.status(200).end();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

module.exports = router;
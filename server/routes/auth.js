const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require('path');

const Document = require('./../models/Document');
const Token = require('./../models/Token');
const Code = require('./../models/Code');
const User = require('./../models/User');
const Office = require('./../models/Office');

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
        document.offices.push({ officeId, status: 'pending' });
        document.currentOffice = officeId;
        document.status = 'pending';

        await document.save();

        res.end();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/pendingdocuments', async (req, res) => {
    try {
        const { userId, officeId } = req.body;

        const dbUser = await User.findOne({ role: 'officer', userId, officeId }).exec();
        if (dbUser == null) {
            throw new Error("User does not exist!");
        }

        const documents = await Document.find({ status: 'pending', currentOffice: dbUser.officeId }).limit(10);

        res.send({ documents });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/verifydocument', async (req, res) => {
    try {
        const { userId, documentId, remark } = req.body;
        const document = await Document.findOneAndUpdate({ documentId }, { status: 'accepted', verifiedBy: userId }, { new: true });
        if (document.status == 'pending') throw new Error('Sorry, Could not verify document. Something went wrong!');

        document.offices[document.offices.length - 1].status = 'accepted';
        document.offices[document.offices.length - 1].remark = remark;

        await Document.findOneAndUpdate({ documentId }, { offices: document.offices });

        res.send('success');
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/rejectdocument', async (req, res) => {
    try {
        const { userId, documentId, remark } = req.body;
        const document = await Document.findOneAndUpdate({ documentId }, { status: 'rejected', verifiedBy: userId }, { new: true });
        if (document.status == 'pending') throw new Error('Sorry, Could not reject document. Something went wrong!');

        document.offices[document.offices.length - 1].status = 'rejected';
        document.offices[document.offices.length - 1].remark = remark;

        await Document.findOneAndUpdate({ documentId }, { offices: document.offices });

        res.send('success');
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/senddocument', async (req, res) => {
    try {
        const { status, remark, documentId, officeId } = req.body;

        if (remark == undefined || remark == null) remark = '';

        if (documentId === undefined || documentId === "") {
            throw new Error("Invalid document Id");
        } else if (officeId === undefined || officeId === "") {
            throw new Error("Invalid office Id");
        }

        const document = await Document.findOne({ documentId });

        if (document === null) {
            throw new Error("No document found with the given document Id");
        }

        document.offices[document.offices.length - 1].status = status;
        document.offices[document.offices.length - 1].remark = remark;

        document.offices.push({ officeId, status: 'pending' });

        await Document.findOneAndUpdate({ documentId }, { offices: document.offices, currentOffice: officeId });

        res.end();
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

router.post('/createoffice', async (req, res) => {
    try {
        const { officeId, state, district, subDistrict, name } = req.body;

        if (officeId == null || officeId == '' || state == '' || state == null || state == 'Select a state' || district == '' || district == null || district == 'Select a district' || subDistrict == '' || subDistrict == null || subDistrict == 'Select a sub-district' || name == '' || name == null) {
            throw new Error('Please enter all the fields below');
        }

        const oldOffice = await Office.findOne({ officeId }).exec();

        if (oldOffice != null) {
            throw new Error('This office already exist');
        }

        await new Office({ officeId, state, district, subDistrict, name }).save();

        res.status(201).send();

    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/pendingofficers', async (req, res) => {
    try {
        const { userId } = req.body;
        const officers = await User.find({ role: 'officer', officerVerified: 'pending' }).limit(10);
        res.send({ officers });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/verifyofficer', async (req, res) => {
    try {
        const { userId, officerId } = req.body;
        const user = await User.findOneAndUpdate({ userId: officerId }, { officerVerified: 'accepted', verifiedBy: userId }, { new: true }).exec();
        if (user.officerVerified == 'pending') throw new Error('Sorry, Could not verify user. Something went wrong!');
        res.send('success');
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/rejectofficer', async (req, res) => {
    try {
        const { userId, officerId } = req.body;
        const user = await User.findOneAndUpdate({ userId: officerId }, { officerVerified: 'rejected', verifiedBy: userId }, { new: true }).exec();
        if (user.officerVerified == 'pending') throw new Error('Sorry, Could not verify user. Something went wrong!');
        res.send('success');
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

router.post('/changepassword', async (req, res) => {
    try {
        const { email, oldpassword, password, cpassword } = req.body;

        const dbUser = await User.findOne({ email }).exec();
        if (dbUser == null) {
            throw new Error("User does not exist!");
        }

        const passwordMatch = await bcrypt.compare(oldpassword, dbUser.password);
        if (!passwordMatch) {
            throw new Error("Wrong password!");
        }
        if (password != cpassword) {
            throw new Error("Passwords do not match");
        }

        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt);

        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        res.status(201).send();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/editprofile', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const dbUser = await User.findOne({ email }).exec();
        if (dbUser == null) {
            throw new Error("User does not exist!");
        }

        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (!passwordMatch) {
            throw new Error("Wrong password!");
        }

        await User.findOneAndUpdate({ email }, { firstName, lastName, phone });

        res.status(201).send();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/deleteaccount', async (req, res) => {
    try {
        const { userId, email, password } = req.body;
        const dbUser = await User.findOne({ userId, email });
        if (dbUser == null) {
            throw new Error("User does not exist!");
        }
        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (!passwordMatch) {
            throw new Error("Wrong password!");
        }

        await User.findOneAndDelete({ userId, email });
        await Token.deleteMany({ userId });
        await Code.findOneAndDelete({ email });
        await Document.deleteMany({ userId });

        res.status(200).end();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

module.exports = router;
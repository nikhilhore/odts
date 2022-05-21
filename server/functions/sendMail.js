const nodeMailer = require('nodemailer');
require('dotenv').config();

const mailInfo = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.emailId,
        pass: process.env.emailPass
    }
}

const transport = nodeMailer.createTransport(mailInfo);

const sendMail = function (mailOptions) {
    mailOptions.from = process.env.emailId;
    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = sendMail;
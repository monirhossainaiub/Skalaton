"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nodemailer = require('nodemailer');
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    //1) Create a transporter
    console.log(options);
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        // Activate in gmail "less secure app" option // use sendGrid or mailGun
    });
    // 2) Define email options
    const mailOptions = {
        from: process.env.EMAIL_EMAIL,
        to: options.email,
        subject: options.subject,
        //html: '<h1>Attachments</h1>',
        text: options.message
    };
    // 3) Actually send the email 
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('errpr...........', error);
        }
        console.log('Email sent: ' + info.response);
    });
});
module.exports = sendEmail;

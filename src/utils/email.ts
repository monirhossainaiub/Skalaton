const nodemailer = require('nodemailer');

const sendEmail = async (options: any) => {
  //1) Create a transporter
  console.log(options)
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
  await transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      return console.log('errpr...........', error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports =  sendEmail;

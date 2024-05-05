const nodemailer = require("nodemailer");

const ForgotEmail = async opt =>{

  const transporter = nodemailer.createTransport({
        host: process.env.Email_Host,
        port: 587,
        secure: false,
        auth: {
          user: process.env.Email_User,
          pass: process.env.Email_Password,
        },
      });

    const mailoption =   {
        from: 'sunairahmed9908@gmail.com', // sender address
        to: opt.email, // list of receivers
        subject: opt.subject, // Subject line
        text: opt.text, // plain text body
      };  
     
    await transporter.sendMail(mailoption)
}
module.exports = ForgotEmail
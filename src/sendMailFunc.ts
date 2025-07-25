import nodemailer from "nodemailer";
import * as dotenv from 'dotenv'

dotenv.config({ path: './src/.env' });

const mail_username = process.env.MAIL_USERNAME
const mail_pass = process.env.MAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    
    auth: {
        user: mail_username,
        pass: mail_pass,
       
    }
});
console.log(mail_username, mail_pass);
function sendMailFN(mail_data: string){
let mailOptions = {
  from: 'gamermobile229@gmail.com',
  to: 'mkg245108@gmail.com',
  subject: 'Sending Email using Node.js',
  text: mail_data
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})};



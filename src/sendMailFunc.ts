import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const mail_username = process.env.MAIL_USERNAME;
const mail_pass = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",

  auth: {
    user: mail_username,
    pass: mail_pass,
  },
});
export function sendMailFN(
  toWhom: string,
  subjectMail: string,
  mail_data: string
) {
  let mailOptions = {
    from: "gamermobile229@gmail.com",
    to: toWhom,
    subject: subjectMail,
    text: mail_data,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

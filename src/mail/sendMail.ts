import nodemailer from "nodemailer"
import { config } from "../secrets";
const MAIL_KEY = config.MAIL_KEY;
export async function sendEmail(userEmail: string, userPhone: string, userMessage: string, excursion: string[], reciver: string) {
    if (!userEmail) {
        userEmail = 'noureldin.20200396@gmail.com'
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "noureldin.20200396@gmail.com",
            pass: MAIL_KEY,
        },
    });

    const imagesHtml = excursion
        .map((src) => `<img src="${src}" style="max-width: 100%; height: auto; display: block; margin-bottom: 10px;" />`)
        .join("");

    const info = await transporter.sendMail({
        from: `"Client ${userEmail} ${userPhone}" <noureldin.20200396@gmail.com>`, // Sender address
        to: reciver,
        subject: `"Portfolio Contact Me"`, // Subject line
        html: `<b>${userEmail}</b> <br />
          <p>${userMessage}</p> <br />
          ${imagesHtml}`, // HTML body with multiple images
    });

    console.log("Message sent: %s", info.messageId);
}
export async function sendContactMeMail(userEmail: string, userPhone: string, userMessage: string, excursion: string[], reciver: string) {
    if (!userEmail) {
        userEmail = 'noureldin.20200396@gmail.com'
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "noureldin.20200396@gmail.com",
            pass: MAIL_KEY,
        },
    });
    const imagesHtml = excursion
        .map((src) => `<img src="${src}" style="max-width: 100%; height: auto; display: block; margin-bottom: 10px;" />`)
        .join("");

    const info = await transporter.sendMail({
        from: `"Client ${userEmail} ${userPhone}" <noureldin.20200396@gmail.com>`, // Sender address
        to: reciver,
        subject: `"Portfolio Contact Me"`, // Subject line
        html: `<b>${userEmail}</b> <br />
          <p>${userMessage}</p> <br />
          ${imagesHtml}`, // HTML body with multiple images
    });
    console.log("Message sent: %s", info.messageId);
}
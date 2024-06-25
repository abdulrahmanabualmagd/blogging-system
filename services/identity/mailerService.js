/*
 * Not working with database ( Not using any models or repositories )
 * For more references visit https://nodemailer.com/
 * For more mailers options [ MailGun & SendGrid ] offers free plan (limited mails per month)
 */

const mailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// Mailer Configuration (Create Transporter)
const transporter = mailer.createTransport({
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
    },
});

// Password Reset Mailer
exports.passwordResetMail = async (email, token) => {
    // Get password reset email body
    const templatePath = path.join(__dirname, "../views/resetPasswordEmailbody.html");
    const template = await fs.readFile(templatePath, "utf-8");

    const result = await transporter.sendMail({
        from: `${process.env.MAILER_SENDER_NAME} <${process.env.MAILER_AUTH_USER}>`,
        to: email,
        subject: "User Reset Password ♻",
        html: template,
    });

    return result;
};

// Password Reset Mailer
exports.emailVerificationMail = async (email, token) => {
    //const verificationUrl = `http://${process.env.APP_HOST || 'localhost'}:3000/auth/verify`;

    console.log(email);
    console.log(token);

    const verificationUrl = `http://localhost:3000/auth/activate`;

    const result = await transporter.sendMail({
        from: `${process.env.MAILER_SENDER_NAME} <${process.env.MAILER_AUTH_USER}>`,
        to: email,
        subject: "Email Verification ♻",
        html: `
            <p>Please verify your email by clicking the button below:</p>
            <form action="${verificationUrl}" method="POST">
                <input type="hidden" name="token" value="${token}" />
                <button type="submit">Activate Email</button>
            </form>
        `,
    });

    return result;
};

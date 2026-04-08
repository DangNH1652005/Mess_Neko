import { path, env } from "../configs/env.config.js"
import { transporter } from "../configs/mail.config.js";

export async function sendVerificationEmail(toEmail, token) {
    const verifyUrl = `${path.APP_URL}/${token}`;
    const mailOptions = {
        from: env.SMTP_FROM,
        to: toEmail,
        subject: 'Verify your email',
        html: 
            `<p>
                Click the link to verify your email: 
                <a href="${verifyUrl}">${verifyUrl}</a>
            </p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${toEmail}`);
}

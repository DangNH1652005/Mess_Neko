import { env } from "../configs/env.config.js";
import { transporter } from "../configs/mail.config.js";

export const sendVerificationOtpEmail = async (email, fullName, otp) => {
  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: email,
    subject: "Verify your account",
    html: `
      <h2>Hello ${fullName}</h2>
      <p>Your verification code is:</p>

      <h1>${otp}</h1>

      <p>This code expires in 10 minutes.</p>
    `,
  });
};

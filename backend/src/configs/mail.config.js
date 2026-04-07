import nodemailer from "nodemailer";
import { env } from "./env.config.js";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'true',
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const verifyMail = async () => {
  try {
    await transporter.verify();
    console.log("Mail server is ready");
  } catch (err) {
    console.error("Mail verification failed:", err);
  }
};
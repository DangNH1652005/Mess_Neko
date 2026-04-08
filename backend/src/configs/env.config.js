import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,

  // env of mongodb
  MONGO_URI: process.env.MONGO_URI || null,

  // env of send email
  SMTP_USER: process.env.SMTP_USER || null,
  SMTP_PASS: process.env.SMTP_PASS || null,
  SMTP_SECURE: process.env.SMTP_SECURE || "false",
  SMTP_HOST: process.env.SMTP_HOST || null,
  SMTP_PORT: process.env.SMTP_PORT || null,
  SMTP_FROM: process.env.SMTP_FROM || null,

  // env of redis
  REDIS_URL: process.env.REDIS_URL || null,

  JWT_SECRET: process.env.JWT_SECRET || null,

  // cookie
  maxAge: 3600000,
  NODE_ENV: process.env.NODE_ENV || null
};

export const path = {
  // example: http://localhost:5000
  APP_URL: `${process.env.APP_URL}/api/auth/verify`
}


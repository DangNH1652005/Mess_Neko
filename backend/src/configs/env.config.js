import dotenv from "dotenv";

dotenv.config();

export const env = {
  URL_FRONTEND: process.env.URL_FRONTEND,

  PORT: process.env.PORT || 3000,

  // env of mongodb
  MONGO_URI: process.env.MONGODB_URI || null,

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
  NODE_ENV: process.env.NODE_ENV || null,

  // cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || null,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || null,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || null,

  STREAM_API_KEY: process.env.STREAM_API_KEY || null,
  STREAM_SECRET: process.env.STREAM_SECRET || null
};

export const path = {
  // example: http://localhost:5000
  APP_URL: `${process.env.APP_URL}/api/auth/verify`
}


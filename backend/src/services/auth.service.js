import { env } from "../configs/env.config.js";
import User from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.util.js";
import { generateOtp } from "../utils/opt.util.js";
import { sendVerificationOtpEmail } from "./email.service.js";
import { createVerificationOtp, sendVerificationOtp } from "./otp.service.js";
import { upsertStreamUser } from "./stream-chat.service.js";
import jwt from 'jsonwebtoken';

export const signup = async (reqBody) => {
   let user = await User.findOne({
    email: reqBody.email,
  });

  if (user && user.isVerified) {
    throw new Error("Email already exists");
  }

  if (!user) {
    user = await User.create({
      fullName: reqBody.fullName,
      email: reqBody.email,
      password: reqBody.password,
    });
  }

  await sendVerificationOtp(user);

  return {
    success: true,
    message: "Verification code sent to your email",
  };
};

export const login = async (email, password, res) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not exist");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    throw new Error("Password not correct");
  }

  // const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
  //   expiresIn: "7d",
  // });

  const token = generateToken(user._id, res);
  return {
    token,
    user,
  };
};

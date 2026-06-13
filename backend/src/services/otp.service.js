import { env } from "../configs/env.config.js";
import User from "../models/User.model.js";
import VerificationOtp from "../models/VerificationOtp.model.js";
import { syncStreamUser, upsertStreamUser } from "./stream-chat.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateOtp, verifyOtpCode } from "../utils/opt.util.js";
import { sendVerificationOtpEmail } from "./email.service.js";
import { generateToken } from "../utils/generateToken.util.js";

// Resend OTP code
export const resendOtp = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email already verified");
  }

  await sendVerificationOtp(user);

  return {
    success: true,
    message: "New verification code sent",
  };
};

// create otp
export const createVerificationOtp = async (userId, otp) => {
  await VerificationOtp.deleteMany({
    userId,
  });

  const otpHash = await bcrypt.hash(otp, 10);

  return VerificationOtp.create({
    userId,
    otpHash,
    attempts: 0,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });
};

// send otp to email
export const sendVerificationOtp = async (user) => {
  const otp = generateOtp();

  await createVerificationOtp(user._id, otp);

  await sendVerificationOtpEmail(user.email, user.fullName, otp);
};

// verify otp input with otp in email
export const verifyEmailOtp = async (email, otp, res) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email already verified");
  }

  const verification = await VerificationOtp.findOne({
    userId: user._id,
  });

  if (!verification) {
    throw new Error("Verification code not found");
  }

  if (verification.expiresAt < new Date()) {
    await VerificationOtp.deleteOne({
      _id: verification._id,
    });

    throw new Error("OTP expired");
  }

  const isMatch = await verifyOtpCode(verification, otp);

  if (!isMatch) {
    verification.attempts += 1;

    if (verification.attempts >= 3) {
      await VerificationOtp.deleteOne({
        _id: verification._id,
      });

      throw new Error("Too many failed attempts. Please request a new OTP.");
    }

    await verification.save();

    throw new Error("Invalid verification code");
  }

  user.isVerified = true;

  await user.save();

  await VerificationOtp.deleteOne({
    _id: verification._id,
  });

  await syncStreamUser(user);

  const token = generateToken(user._id, res);

  return {
    token,
    user,
  };
};

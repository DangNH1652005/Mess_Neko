import jwt from "jsonwebtoken";

import {
  loginSchema,
  onboardSchema,
  signupSchema,
  verifyOptSchema,
} from "../validators/auth.validator.js";
import User from "../models/User.model.js";
import { env } from "../configs/env.config.js";
import { upsertStreamUser } from "../services/stream-chat.service.js";
import { verifyEmailOtp } from "../services/otp.service.js";
import { login, signup } from "../services/auth.service.js";

export const verifyOtpController = async (req, res) => {
  try {
    const { error, value } = verifyOptSchema.validate(req.body);
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    const { token, user } = await verifyEmailOtp(value.email, value.otp, res);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signupController = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    const result = await signup(value);
    return res.status(201).json(result);
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { token, user } = await login(value.email, value.password, res);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { error, value } = onboardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { returnDocument: "after" },
    );

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userData = await upsertStreamUser({
      id: updateUser._id.toString(),
      name: updateUser.fullName,
      image: updateUser.profilePic || "",
    });

    res.status(200).json({
      cuccess: true,
      user: updateUser,
    });
  } catch (error) {
    console.log("Error in onboard controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

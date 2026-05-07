import jwt from "jsonwebtoken";

import {
  loginSchema,
  onboardSchema,
  signupSchema,
} from "../validators/auth.validator.js";
import User from "../models/User.model.js";
import { env } from "../configs/env.config.js";
import { upsertStreamUser } from "../services/stream-chat.service.js";

export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists, please use a different one",
      });
    }

    const newUser = await User.create({
      fullName: value.fullName,
      email: value.email,
      password: value.password,
    });

    const userData = await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });

    if (userData) {
      console.log(`Stream user created for ${userData.name}`);
    }

    const token = jwt.sign({ userId: newUser._id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV,
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({
        message: "User not exist",
      });
    }

    const isPasswordCorrect = await user.matchPassword(value.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password not correct",
      });
    }

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({
      message: "Internal Server Error",
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

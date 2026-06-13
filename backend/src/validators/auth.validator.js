import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const onboardSchema = Joi.object({
  fullName: Joi.string().required(),
  bio: Joi.string().required(),
  nativeLanguage: Joi.string().required(),
  learningLanguage: Joi.string().required(),
  location: Joi.string().required(),
  profilePic: Joi.string().uri().allow(""),
});

export const verifyOptSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required()
})

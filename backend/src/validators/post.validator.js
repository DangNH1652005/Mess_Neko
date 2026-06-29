import Joi from "joi";
import { POST_VISIBILITY } from "../constants/post.constant.js";

export const createPostSchema = Joi.object({
  content: Joi.string().trim().max(2000).required().messages({
    "string.empty": "Content is required",
    "string.max": "Content must not exceed 2000 characters",
    "any.required": "Content is required",
  }),

  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          "string.uri": "Image url must be a valid URL",
          "any.required": "Image url is required",
        }),
        publicId: Joi.string().required().messages({
          "any.required": "Image publicId is required",
        }),
      })
    )
    .max(10)
    .default([])
    .messages({ "array.max": "Maximum 10 images allowed" }),

  visibility: Joi.string()
    .valid(...Object.values(POST_VISIBILITY))
    .default(POST_VISIBILITY.PUBLIC)
    .messages({ "any.only": `Visibility must be one of: ${Object.values(POST_VISIBILITY).join(", ")}` }),
});


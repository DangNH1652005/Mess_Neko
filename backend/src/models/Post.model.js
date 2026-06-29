import mongoose from "mongoose";
import { POST_VISIBILITY } from "../constants/post.constant.js";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    visibility: {
      type: String,
      enum: Object.values(POST_VISIBILITY),
      default: POST_VISIBILITY.PUBLIC,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

postSchema.index({ author: 1, createdAt: -1 });

const Post = model("posts", postSchema);

export default Post;

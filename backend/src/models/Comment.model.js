import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

commentSchema.index({
  post: 1,
  createdAt: -1,
});

const Comment = model("comments", commentSchema);

export default Comment;

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

likeSchema.index(
  {
    post: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

const Like = model("likes", likeSchema);

export default Like;

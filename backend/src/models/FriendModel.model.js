import mongoose from "mongoose";

const { Schema, model } = mongoose;

const friendSchema = new Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// tránh duplicate (A,B) và (B,A)
friendSchema.index(
    { user1: 1, user2: 1 }, 
    { unique: true }
);

const FriendModel = model("friends", friendSchema);

export default FriendModel;
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const friendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequestModel = model("friend_requests", friendRequestSchema);

export default FriendRequestModel;
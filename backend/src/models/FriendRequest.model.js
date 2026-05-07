import mongoose, { Mongoose } from "mongoose";
const { Schema, model } = mongoose;

const friendRequestSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
}, { timestamps: true });

const FriendsRequest = model('friend_requests', friendRequestSchema);
export default FriendsRequest;
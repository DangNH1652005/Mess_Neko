import mongoose from "mongoose";

const { Schema, model } = mongoose;

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    isGroup: {
      type: Boolean,
      default: false,
    },

    groupName: {
      type: String,
      default: "",
    },

    groupAvatar: {
      type: String,
      default: "",
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "messages",
    },
  },
  { timestamps: true }
);

// index để query nhanh
conversationSchema.index({ members: 1 });

const ConversationModel = model("conversations", conversationSchema);

export default ConversationModel;
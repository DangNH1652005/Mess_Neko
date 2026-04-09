import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },

    content: {
      text: {
        type: String,
        default: "",
      },

      imageUrl: {
        type: String,
        default: "",
      },

      fileUrl: {
        type: String,
        default: "",
      },

      fileName: {
        type: String,
        default: "",
      },
    },

    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

// index để load message nhanh
messageSchema.index({ conversation: 1 });

const MessageModel = model("messages", messageSchema);

export default MessageModel;
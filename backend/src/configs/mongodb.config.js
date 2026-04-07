import mongoose from "mongoose";
import { env } from "./env.config.js";

const initMongo = async () => {
  try {
    if (!env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is empty! Please set it in env.config.js or .env file."
      );
    }

    await mongoose.connect(env.MONGO_URI);

    console.log("MongoDB connected");

    mongoose.connection.on("error", (err) => {
      console.Error("MongoDB runtime error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default initMongo;
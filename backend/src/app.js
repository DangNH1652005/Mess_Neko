import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import { env } from "./configs/env.config.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: env.URL_FRONTEND, // need fix move into env
    credentials: true
}))

// router
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use('/api/comments', commentRoutes);

export default app;

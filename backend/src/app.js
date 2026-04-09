import express from 'express';
import authRoute from "./routes/auth.route.js";
import friendRoute from "./routes/friend.route.js";
import cookieParser from 'cookie-parser';
import usersRoute from "./routes/user.route.js";
import requestFriend from './routes/friend-request.route.js';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// route
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/friends", friendRoute);
app.use("/api/friend-requests", requestFriend);


export default app;
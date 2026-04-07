import express from 'express';
import authRoute from "./routes/auth.route.js";
const app = express();

// middleware
app.use(express.json());

// route
app.use("/api/auth", authRoute);


export default app;
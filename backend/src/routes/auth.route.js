import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema, loginScheme } from "../validators/auth.validator.js";
import { login, signup, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validate(signupSchema), signup);

router.get("/verify/:token", verifyToken);

router.get("/login", validate(loginScheme), login);
export default router;
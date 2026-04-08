import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema, loginScheme } from "../validators/auth.validator.js";
import { login, signup, verifyToken, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(signupSchema), signup);

router.get("/verify/:token", verifyToken);

router.post("/login", validate(loginScheme), login);
router.post("/logout", protectRoute, logout);

router.get("/check", protectRoute, checkAuth);
export default router;
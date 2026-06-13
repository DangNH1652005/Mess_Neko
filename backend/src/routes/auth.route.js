import express from "express";
import {
  loginController,
  logout,
  onboard,
  signupController,
  verifyOtpController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logout);
router.post("/verify-otp", verifyOtpController);

router.post("/onboarding", protectRoute, onboard);

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
export default router;

import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { deleteCommentController } from "../controllers/comment.controller.js";

const router = express.Router();
router.use(protectRoute);

// user delete comment
router.delete("/:id", deleteCommentController);

export default router;


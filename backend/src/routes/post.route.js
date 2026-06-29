import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createPostController, getPostByIdController, getPostsController } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { likePostController, unlikePostController } from "../controllers/like.controller.js";
import { createCommentByPostIdController, getAllCommentByPostIdController } from "../controllers/comment.controller.js";

// api/posts
const router = express.Router();
router.use(protectRoute);

// create post
router.post("/", upload.array("images", 10) ,createPostController);
// view all posts
router.get("/", getPostsController);
// view detail post 
router.get("/:id", getPostByIdController);
// like post
router.post("/:id/like", likePostController);
// unlike post
router.delete("/:id/like", unlikePostController);
// get all comment in a post
router.get("/:id/comments", getAllCommentByPostIdController);
// user comment in a post
router.post("/:id/comments", createCommentByPostIdController);

export default router;
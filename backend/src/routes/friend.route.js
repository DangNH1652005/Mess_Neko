import express from 'express';
import { protectRoute } from "../middlewares/auth.middleware.js";
import { sendFriendRequest, unfriend } from '../controllers/friend.controller.js';

const router = express.Router();
router.post("/sendFriendRequest", protectRoute, sendFriendRequest);
router.delete("/:friendId", protectRoute, unfriend);

export default router;
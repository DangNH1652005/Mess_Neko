import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { acceptFriendRequest, rejectFriendRequest } from '../controllers/friend.controller.js';

const router = express.Router();

router.patch("/:requestId/accept", protectRoute, acceptFriendRequest);
router.patch("/:requestId/reject", protectRoute, rejectFriendRequest);
export default router;
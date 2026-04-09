import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { searchUserController } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/search", protectRoute, searchUserController);

export default router;
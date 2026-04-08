import { env } from "../configs/env.config.js";
import UserModel from "../models/User.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if(!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if(!decoded?.userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        const user = await UserModel.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized' });
    }
}
import crypto from 'crypto';
import redisClient from '../configs/redis.config.js';
import UserModel from '../models/User.model.js';
import { sendVerificationEmail } from './email.service.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.util.js';

const REGISTER_TTL = 15 * 60;

export const registerUser = async ({ username, email, passwordHash }) => {
    const token = crypto.randomBytes(32).toString('hex');
    const value = JSON.stringify({ username, email, passwordHash });
    await redisClient.setEx(`register:${token}`, REGISTER_TTL, value);
    await sendVerificationEmail(email, token);
    // console.log(`register:${token}`);
    return { 
        message: 'User registered. Check your email to verify.' 
    };
}

export const verifyEmail = async (token) => {
    const value = await redisClient.get(`register:${token}`);
    if (!value) {
        return null;
    }
    // console.log(value);
    const { username, email, passwordHash } = JSON.parse(value);
    const user = await UserModel.create({ username, email, password: passwordHash, isVerified: true });
    await redisClient.del(`register:${token}`);
    return user;
}

export const loginUser = async (email, password, res) => {
    const user = await UserModel.findOne({ email });
    if(!user) {
        throw new Error('Can not find user on mongodb');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    generateToken(user._id, res);
    const { password: pwd, ...userData } = user._doc;
    return userData;
}
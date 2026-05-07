import jwt from 'jsonwebtoken';
import { env } from "../configs/env.config.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '10h' });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: env.maxAge
    })

    return token;
}


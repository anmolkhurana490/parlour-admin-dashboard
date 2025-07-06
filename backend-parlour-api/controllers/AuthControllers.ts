import jwt from 'jsonwebtoken';
import { User } from '../models/UserSchema.js';

const JWT_SECRET: string = process.env.JWT_SECRET || 'defaultsecretkey';

export const findUser = async (email: string, password: string) => {
    // Find user by email and password
    const user = await User.findOne({ email, password });
    return user;
};

export const generateToken = (user: any) => {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        {
            expiresIn: '1d' // Token expires in 1 day
        }
    );
    return token;
};

export const verifyUser = async (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
            return {};
        }

        const user = await User.findById((decoded as jwt.JwtPayload).id);
        if (!user) {
            return {};
        }

        return user;
    } catch (error) {
        // console.error('Error verifying token:', error);
        // If token verification fails, return Unauthorized
        return {};
    }
}
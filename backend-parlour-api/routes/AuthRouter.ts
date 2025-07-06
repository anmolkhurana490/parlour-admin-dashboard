import express, { Request, Response } from 'express';
import { findUser, generateToken, verifyUser } from '../controllers/AuthControllers.js';

const router = express.Router();

router.post('/login', async (req, res): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await findUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
        });

        res.json({ message: 'Login successful', user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', (error as Error).message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/logout', (req, res): void => {
    res.clearCookie('authToken');
    res.json({ message: 'Logout successful' });
});

router.get('/check-auth', async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user: any = await verifyUser(token);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json({ id: user._id, email: user.email, role: user.role });

    } catch (error) {
        console.error('Authentication error:', (error as Error).message);
        res.status(401).json({ message: 'Unauthorized' });
    }
});

export default router;
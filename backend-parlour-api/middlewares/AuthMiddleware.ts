import { Request, Response, NextFunction } from "express";
import { verifyUser } from "../controllers/AuthControllers.js";

interface AuthenticatedRequest extends Request {
    user?: any;
    cookies: {
        [key: string]: string;
    };
}

const middleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user: any = await verifyUser(token);
        if (!user || !user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.user = user; // Attach user to request object

        // admin user can see but can't modify the data
        const blockedMethods = ['POST', 'PUT', 'DELETE'];
        if (user.role !== 'SuperAdmin' && blockedMethods.includes(req.method)) {
            res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
            return;
        }

        next();
    } catch (error) {
        console.error('Error in middleware:', (error as Error).message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default middleware;
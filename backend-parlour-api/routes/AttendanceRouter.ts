import express, { Request, Response } from 'express';
import { getPunchList, punchAttendance } from '../controllers/AttendanceControllers.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    // Fetch attendance records from the database
    try {
        const response: any = await getPunchList(res);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/punch', async (req: Request, res: Response): Promise<any> => {
    const { id, punchType } = req.body as { id: string; punchType: 'IN' | 'OUT' };
    // console.log('Punch request received:', { id, punchType });

    if (!id || !punchType) {
        return res.status(400).json({ message: 'Employee ID and punch type are required' });
    }

    try {
        // Record the punch in the database
        const punchRecord = await punchAttendance(res, id, punchType);
        res.status(201).json(punchRecord);
    } catch (error) {
        console.error('Error recording punch:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
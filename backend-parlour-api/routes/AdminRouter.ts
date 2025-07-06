import express, { Router, Request, Response } from 'express';
import { getAllAdmins, addAdmin, updateAdmin, deleteAdmin } from '../controllers/AdminControllers.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const admins = await getAllAdmins(req, res);
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching admins', error });
    }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const adminData = {
            name,
            email,
            password,
            role // Assuming role can be 'SuperAdmin' or 'Admin'
        };

        const newAdmin = await addAdmin(adminData);
        return res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding admin', error });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updateData: any = {
            name,
            email,
            password,
            role // Assuming role can be 'SuperAdmin' or 'Admin'
        };

        const updatedAdmin = await updateAdmin(id, updateData);
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        return res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating admin', error });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }

        const deletedAdmin = await deleteAdmin(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        return res.status(200).json({ message: 'Admin deleted successfully', admin: deletedAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting admin', error });
    }
});

export default router;
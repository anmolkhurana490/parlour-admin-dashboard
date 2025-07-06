import express, { Request, Response } from 'express';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/EmployeeControllers.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        // console.error('Error fetching employees:', error);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, name, position, salary } = req.body;

        if (!email || !name || !position || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const createdEmployee = await createEmployee({
            email,
            name,
            position,
            salary
        });

        res.status(201).json(createdEmployee);
    } catch (error) {
        // console.error('Error creating employee:', error);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { email, name, position, salary } = req.body;

        if (!email || !name || !position || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedEmployee = await updateEmployee(id, {
            email,
            name,
            position,
            salary
        });

        return res.status(200).json(updatedEmployee);
    } catch (error) {
        // console.error('Error updating employee:', error.message);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const deletedEmployee = await deleteEmployee(id);

        return res.status(200).json(deletedEmployee);
    } catch (error) {
        // console.error('Error deleting employee:', error);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

export default router;
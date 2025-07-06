import express, { Request, Response } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/TaskControllers.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching Tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description, assignedTo, dueDate, status } = req.body;

        if (!title || !description || !assignedTo || !dueDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const createdTask = await createTask({
            title,
            description,
            assignedTo,
            dueDate,
            status
        });

        res.status(201).json(createdTask);
    } catch (error) {
        console.error('Error creating Task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { title, description, assignedTo, dueDate, status } = req.body;

        if (!title || !description || !assignedTo || !dueDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedTask = await updateTask(id, {
            title,
            description,
            assignedTo,
            dueDate,
            status
        });

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating Task:', error);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteTask(id);

        return res.status(200).json(deletedTask);
    } catch (error) {
        console.error('Error deleting Task:', error);
        res.status(500).json({ message: (error as Error).message || 'Internal Server Error' });
    }
});

export default router;
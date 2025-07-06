import { Task } from '../models/TaskSchema.js';

// Get all Tasks
export const getTasks = async () => {
    const tasks = await Task.find();
    return tasks;
}

// Create a new Task
export const createTask = async (taskData: unknown) => {
    const newTask = new Task(taskData);
    await newTask.save();
    return newTask;
};

// Update an Task
export const updateTask = async (id: string, taskData: any) => {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
    if (!updatedTask) {
        throw new Error('Task not found');
    }
    return updatedTask;
};

// Delete an Task
export const deleteTask = async (id: string) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        throw new Error('Task not found');
    }
    return deletedTask;
};
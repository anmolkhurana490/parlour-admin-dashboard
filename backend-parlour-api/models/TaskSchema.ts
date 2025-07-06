import mongoose, { Model } from 'mongoose';

export interface ITask {
    title: string;
    description: string;
    assignedTo: mongoose.Schema.Types.ObjectId;
    dueDate: Date;
    status: 'pending' | 'in-progress' | 'completed';
}

const taskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
});

export const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);
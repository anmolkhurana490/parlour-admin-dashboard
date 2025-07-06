import mongoose, { Model } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    name: string;
    role: "SuperAdmin" | "Admin";
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["SuperAdmin", "Admin"] },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
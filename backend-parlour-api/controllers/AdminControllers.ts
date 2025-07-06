import { Request, Response } from 'express';
import { User } from '../models/UserSchema.js';

export const getAllAdmins = async (req: Request, res: Response) => {
    const admins = await User.find();
    return admins;
}

export const addAdmin = async (adminData: any) => {
    const newAdmin = new User(adminData);
    await newAdmin.save();
    return newAdmin;
}

export const updateAdmin = async (adminId: string, updateData: any) => {
    const updatedAdmin = await User.findByIdAndUpdate(adminId, updateData, { new: true });
    if (!updatedAdmin) {
        return { status: 404, message: 'Admin not found' };
    }
    return updatedAdmin;
};

export const deleteAdmin = async (adminId: string) => {
    const deletedAdmin = await User.findByIdAndDelete(adminId);
    return deletedAdmin;
}

// Initially, you can create an admin like this:
// addAdmin({
//     email: "anmol123@gmail.com",
//     password: "anmol123",
//     name: "Anmol",
//     role: "SuperAdmin",
// })
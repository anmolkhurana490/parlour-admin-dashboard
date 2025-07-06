import mongoose, { Model } from "mongoose";

export interface IAttendance {
    punchIn: Date;
    punchOut?: Date;
}

const AttendanceSchema = new mongoose.Schema<IAttendance>({
    punchIn: { type: Date, required: true, },
    punchOut: { type: Date },
}, { _id: false });

export interface IEmployee {
    email: string;
    name: string;
    position: string;
    salary: number;
    isActive?: boolean;
    attendance?: IAttendance[];
}

const employeeSchema = new mongoose.Schema<IEmployee>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
    attendance: [AttendanceSchema],
});

export const Employee: Model<IEmployee> = mongoose.model<IEmployee>("Employee", employeeSchema);
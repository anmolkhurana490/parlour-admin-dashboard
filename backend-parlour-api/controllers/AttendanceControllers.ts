import { Request, Response } from 'express';
import { Employee } from '../models/EmployeeSchema.js';

// get all attendance records to display on the dashboard
export const getAllRecords = async () => {
    const attendanceRecords = await Employee.find().select('name attendance isActive');

    // for each employee, filter attendance records for today
    const data = attendanceRecords.map(getFilteredRecord);
    return data;
}

// for a specific employee, filter attendance records for today
export const getFilteredRecord = (employee: any) => {
    const todayPunches = (employee.attendance || []).filter(
        (record: any) =>
            record.punchIn &&
            new Date(record.punchIn).toDateString() === new Date().toDateString()
    );

    return {
        _id: employee._id,
        name: employee.name,
        punchIn: todayPunches.length > 0 ? todayPunches[0].punchIn : null,
        punchOut: todayPunches.length > 0 ? todayPunches[0].punchOut : null,
        isActive: employee.isActive
    };
}


// for public attendance punch list
export const getPunchList = async (res: Response) => {
    const attendanceRecords = await Employee.find().select('name email isActive');
    return attendanceRecords;
}

export const punchAttendance = async (res: Response, employeeId: string, punchType: 'IN' | 'OUT') => {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    if (!employee.attendance) {
        employee.attendance = [];
    }

    const lastAttendance: any = employee.attendance.slice(-1)[0];

    if (punchType === 'IN' && (!lastAttendance || lastAttendance.punchOut)) {
        const attendanceRecord: any = { punchIn: new Date() };
        employee.attendance.push(attendanceRecord);
        employee.isActive = true; // Mark employee as active on punch in
    }
    else if (punchType === 'OUT' && lastAttendance && !lastAttendance.punchOut) {
        lastAttendance.punchOut = new Date();
        employee.isActive = false; // Mark employee as inactive on punch out
    }
    else {
        return res.status(400).json({ message: 'Invalid Punch Operation!' });
    }

    await employee.save();

    res.status(200).json({ message: 'Attendance recorded successfully' });
};
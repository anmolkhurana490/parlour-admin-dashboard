"use client";
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { getData } from "@/lib/data";
import { Switch } from "@/components/ui/switch"
import { getAttendanceData, punchAttendance } from "@/lib/data";

const page = () => {
    return (
        <div className="mx-16">
            <h1 className="text-2xl my-4 font-bold">Employee Attendance - Punch In/Out</h1>
            <div className="flex-1 min-w-[320px] bg-white rounded-lg shadow-md p-4">
                <AttendanceTable />
            </div>
        </div>
    )
}

const AttendanceTable = () => {
    interface AttendanceItem {
        _id: string;
        name: string;
        email: string;
        isActive: boolean;
    }

    const [data, setData] = useState<AttendanceItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAttendanceData();
            if (response) {
                console.log("Attendance Data:", response);
                setData(response);
            }
        }
        fetchData();
    }, [])

    const togglePunch = async (id: string, punchType: 'IN' | 'OUT') => {
        const response = await punchAttendance(id, punchType);
        if (response) {
            setData((prevData: AttendanceItem[]) =>
                prevData.map((item: AttendanceItem) =>
                    item._id === id ? { ...item, isActive: punchType === 'IN' } : item
                )
            );
        }
    };

    return (
        <Table>
            <TableCaption>Employee Attendance - Punch In/Out</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Punch Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item: { _id: string; name: string; email: string; isActive: boolean }) => (
                    <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                            <Switch
                                checked={item.isActive}
                                onCheckedChange={() => togglePunch(item._id, item.isActive ? 'OUT' : 'IN')}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default page;
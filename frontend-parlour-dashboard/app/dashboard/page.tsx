"use client";
import React, { use, useContext, useEffect } from 'react'
import { AppContext } from '@/context/AppContext';
import AttendanceLog from '@/components/AttendanceLog';
import EmployeeTable from '@/components/EmployeeTable';
import TaskTable from '@/components/TaskTable';
import AdminTable from '@/components/AdminTable';

const page = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const { user } = context;

    useEffect(() => {
        if (!user) {
            // Redirect to login if user is not authenticated
            window.location.href = '/login';
        }
    }, []);


    return user ? (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                Welcome, {user.role}
            </h1>

            <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex-1 min-w-[320px] bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Attendance Logs</h2>
                    <AttendanceLog />
                </div>
                <div className="flex-2 min-w-[400px] bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Employee Table</h2>
                    <EmployeeTable editable={user.role === 'SuperAdmin'} />
                </div>
            </div>

            <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex-1 min-w-[300px] bg-white rounded-lg shadow-md p-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Task Table</h2>
                    <TaskTable editable={user.role === 'SuperAdmin'} />
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Admins Table</h2>
                    <AdminTable editable={user.role === 'SuperAdmin'} />
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen">Loading Dashboard...</div>
    );
}

export default page;
import React, { use, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
// import { getData } from "@/lib/data"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

interface Attendance {
  _id: string;
  name: string;
  punchIn: Date | null;
  punchOut: Date | null;
  isActive: boolean;
}

const AttendanceLog = () => {
  const [data, setData] = useState<Attendance[]>([])

  useEffect(() => {
    const socket = io(BACKEND_URL)

    socket.emit('get-attendance-logs');

    socket.on('received-logs', (logs) => {
      // console.log('Received logs:', logs);
      setData(logs)
    });

    socket.on('attendance-insert', (log) => {
      // console.log('new log inserted:', log);
      setData((prevData) => [...prevData, log]);
    });

    socket.on('attendance-update', (log) => {
      // console.log('log updated:', log);
      setData((prevData) => prevData.map(item => item._id === log._id ? log : item));
    });

    socket.on('attendance-delete', (log) => {
      // console.log('log deleted:', log);
      setData((prevData) => prevData.filter(item => item._id !== log._id));
    });
  }, [])

  return (
    <Table>
      <TableCaption>A List of Employees Attendance.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Punch-In At</TableHead>
          <TableHead>Punch-Out At</TableHead>
          <TableHead>Punch Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>

        {data.map((item, key) => (
          <TableRow key={key}>
            <TableCell className="w-[300px]">{item.name}</TableCell>
            <TableCell className="text-center">{item.punchIn ? new Date(item.punchIn).toLocaleTimeString() : '-'}</TableCell>
            <TableCell className="text-center">{item.punchOut ? new Date(item.punchOut).toLocaleTimeString() : '-'}</TableCell>
            <TableCell className="text-center">{item.isActive ? 'IN' : 'OUT'}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

export default AttendanceLog

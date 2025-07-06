import { Server } from 'socket.io';
import { getAllRecords, getFilteredRecord } from './AttendanceControllers';
import { Employee } from '../models/EmployeeSchema';
import http from 'http';

const AttendanceSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: ['*', 'http://localhost:3000'],
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        socket.on('get-attendance-logs', async () => {
            // Send the attendance records to the new user connected
            const records = await getAllRecords();
            socket.emit('received-logs', records);
        });
    });

    const changeStream = Employee.watch();

    changeStream.on('change', async (change) => {
        try {
            // You can fetch the latest attendance records and emit to all connected clients
            const changeType = change.operationType; // 'insert', 'update', 'delete'

            if (changeType === 'delete') {
                // If the operation is delete, we can just emit the id of the deleted record
                io.emit(`attendance-${changeType}`, { _id: change.documentKey._id });
                return;
            }

            const updated_data = await Employee.findById(change.documentKey._id);
            // const updated_data = change.updateDescription?.updatedFields
            const filtered_data = getFilteredRecord(updated_data);

            io.emit(`attendance-${changeType}`, filtered_data);
        }
        catch (err: Error | any) {
            console.error('Error in change stream:', err);
        }
    });

    // Signal Interrupt, to gracefully close the change stream and exit
    process.on('SIGINT', () => {
        changeStream.close();
        process.exit();
    });
}

export default AttendanceSocket;
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';

import { connectDB } from './config/db.js';
import AuthRouter from './routes/AuthRouter.js';
import EmployeeRouter from './routes/EmployeeRouter.js';
import AttendanceRouter from './routes/AttendanceRouter.js';
import AdminRouter from './routes/AdminRouter.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import TaskRouter from './routes/TaskRouter.js';
import AttendanceSocket from './controllers/AttendanceSocket.js';

import dotenv from "dotenv";
dotenv.config({ quiet: true });

const app = express();
const httpServer = http.createServer(app);

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['*', 'http://localhost:3000'], // Adjust this to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow cookies to be sent with requests
}));


app.use('/auth', AuthRouter);
app.use('/employees', AuthMiddleware, EmployeeRouter);
app.use('/tasks', AuthMiddleware, TaskRouter);
app.use('/admins', AuthMiddleware, AdminRouter);
app.use('/attendance', AttendanceRouter);

AttendanceSocket(httpServer);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
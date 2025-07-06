import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000';

export const getData = async (url: string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/${url}`, { withCredentials: true });
        return response.data;
    } catch (error: Error | any) {
        console.error(`Error fetching ${url} data:`, error);
        return null;
    }
};

export const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/${url}`, data, { withCredentials: true });
        return response.data;
    } catch (error: Error | any) {
        console.error(`Error posting to ${url}:`, error);
        return null;
    }
}

export const putData = async (url: string, data: any) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/${url}`, data, { withCredentials: true });
        return response.data;
    } catch (error: Error | any) {
        console.error(`Error updating ${url}:`, error);
        return null;
    }
};

export const deleteData = async (url: string) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/${url}`, { withCredentials: true });
        return response.data;
    } catch (error: Error | any) {
        console.error(`Error deleting ${url}:`, error);
        return null;
    }
};

export const getAttendanceData = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/attendance`);
        return response.data;
    } catch (error: Error | any) {
        console.error("Error fetching attendance data:", error);
        return null;
    }
}

export const punchAttendance = async (id: string, punchType: 'IN' | 'OUT') => {
    try {
        const response = await axios.post(`${BACKEND_URL}/attendance/punch`, { id, punchType });
        return response.data;
    } catch (error: Error | any) {
        console.error("Error punching attendance:", error);
        return null;
    }
};
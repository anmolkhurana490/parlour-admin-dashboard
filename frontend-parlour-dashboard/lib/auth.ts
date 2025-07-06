import axios, { Axios, AxiosResponse } from 'axios';
import { error } from 'console';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const loginHandler = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password },
            { withCredentials: true }
        );
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        return response.data;
    } catch (error: Error | any) {
        console.error('Login failed:', error.message);
        return { error: error.message };
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/auth/check-auth`, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
        }
        return response.data;
    } catch (error: Error | any) {
        console.error('Error fetching user:', error.message);
        return null;
    }
}

export const logoutHandler = async () => {
    try {
        const response: any = await axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error('Logout failed');
        }
        return response.data.message;
    } catch (error: Error | any) {
        console.error('Logout failed:', error.message);
        return '';
    }
}
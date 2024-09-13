import axios from 'axios';
import { ToDo } from './types/types';

const API_URL = 'http://localhost:9090/todos';

export const fetchTodos = async (params: any): Promise<ToDo[]> => {
    try {
        const response = await axios.get<ToDo[]>(API_URL, { params });
        return response.data; // response.data contains the array of todos
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch todos');
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const createTodo = async (todo: Partial<ToDo>): Promise<ToDo> => {
    try {
        const response = await axios.post<ToDo>(API_URL, todo);
        return response.data; // response.data contains the created todo
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to create todo');
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const updateTodo = async (id: string, todo: Partial<ToDo>): Promise<ToDo> => {
    try {
        const response = await axios.put<ToDo>(`${API_URL}/${id}`, todo);
        return response.data; // response.data contains the updated todo
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to update todo');
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const markAsDone = async (id: string): Promise<void> => {
    try {
        await axios.post(`${API_URL}/${id}/done`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to mark todo as done');
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const markAsUndone = async (id: string): Promise<void> => {
    try {
        await axios.put(`${API_URL}/${id}/undone`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to mark todo as undone');
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

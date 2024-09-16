// api/api.ts
import axiosInstance from './axiosInstance';
import { ToDo } from '../types/types'; // Assuming you have a ToDo type defined somewhere

// Get all todos, with optional filtering
export const getTodos = (params: any) => {
    return axiosInstance.get<ToDo[]>('/todos', { params });
};

// Create a new todo
export const createTodo = (todo: Partial<ToDo>) => {
    return axiosInstance.post('/todos', todo);
};

// Update an existing todo
export const updateTodo = (id: number, todo: Partial<ToDo>) => {
    return axiosInstance.put(`/todos/${id}`, todo);
};

// Mark a todo as done
export const markAsDone = (id: number) => {
    return axiosInstance.post(`/todos/${id}/done`);
};

// Mark a todo as undone
export const markAsUndone = (id: number) => {
    return axiosInstance.put(`/todos/${id}/undone`);
    
};
// Delete a todo by ID
export const deleteTodo = (id: number) => {
    return axiosInstance.delete(`/todos/${id}`);
};

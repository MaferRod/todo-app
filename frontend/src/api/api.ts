import axios from 'axios';
import { ToDo } from '../types/types';

const API_URL = 'http://localhost:9090/todos';

export const getTodos = (params: any) => {
    return axios.get<ToDo[]>(API_URL, { params });
};

export const createTodo = (todo: Partial<ToDo>) => {
    return axios.post(API_URL, todo);
};

export const updateTodo = (id: string, todo: Partial<ToDo>) => {
    return axios.put(`${API_URL}/${id}`, todo);
};

export const markAsDone = (id: string) => {
    return axios.post(`${API_URL}/${id}/done`);
};

export const markAsUndone = (id: string) => {
    return axios.put(`${API_URL}/${id}/undone`);
};

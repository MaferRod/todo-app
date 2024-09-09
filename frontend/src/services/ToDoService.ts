import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

export const getToDos = () => axios.get(API_URL);
export const createToDo = (todo: any) => axios.post(API_URL, todo);
export const updateToDo = (id: string, todo: any) => axios.put(${API_URL}/${id}, todo);
export const markToDoAsDone = (id: string) => axios.post(${API_URL}/${id}/done);
export const markToDoAsUndone = (id: string) => axios.put(${API_URL}/${id}/undone);
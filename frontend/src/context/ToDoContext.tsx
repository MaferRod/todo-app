import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ToDo } from '../types/types';
import { getTodos } from '../api/api';

interface ToDoContextProps {
    todos: ToDo[];
    refreshTodos: () => void;
}

interface ToDoProviderProps {
    children: ReactNode; // Explicitly define children prop
}

export const ToDoContext = createContext<ToDoContextProps | undefined>(undefined);

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<ToDo[]>([]);

    const refreshTodos = () => {
        getTodos({}).then(response => {
            console.log('Fetched todos:', response.data); // Log data
            setTodos(response.data);
        }).catch(error => console.error('Error fetching todos:', error));
    };

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <ToDoContext.Provider value={{ todos, refreshTodos }}>
            {children}
        </ToDoContext.Provider>
    );
};

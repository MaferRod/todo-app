import React, { useState, useEffect } from 'react';
import ToDoTable from './components/ToDoTable';
import NewToDoModal from './components/NewToDoModal';
import ToDoFilter from './components/ToDoFilter'; // Import the filter component
import { ToDo } from './types/types';
import { getTodos } from './api/api';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({ text: '', priority: '', done: '' });

    useEffect(() => {
        fetchTodos(filters);
    }, [filters]);

    const fetchTodos = (filters: { text?: string; priority?: string; done?: string }) => {
        const params: any = {};

        if (filters.text) params.text = filters.text;
        if (filters.priority) params.priority = filters.priority;
        if (filters.done) params.done = filters.done === 'true';

        getTodos(params)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setTodos(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    };

    const handleAddToDo = (newToDo: ToDo) => {
        setTodos((prevTodos) => [...prevTodos, newToDo]);
    };

    const handleUpdateToDo = (updatedToDo: ToDo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === updatedToDo.id ? updatedToDo : todo))
        );
    };

    const handleDeleteToDo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleFilterChange = (newFilters: { text: string; priority: string; done: string }) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <h1>To Do List</h1>
            <ToDoFilter onFilterChange={handleFilterChange} />
            <button onClick={() => setModalOpen(true)}>+ New To Do</button>
            {isModalOpen && (
                <NewToDoModal
                    closeModal={() => setModalOpen(false)}
                    onSave={handleAddToDo}
                />
            )}
            <ToDoTable
                todos={todos}
                onUpdate={handleUpdateToDo}
                onDelete={handleDeleteToDo}
            />
        </div>
    );
};

export default App;

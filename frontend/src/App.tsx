// App.tsx
import React, { useState, useEffect } from 'react';
import ToDoTable from './components/ToDoTable';
import NewToDoModal from './components/NewToDoModal';
import { ToDo } from './types/types';
import { getTodos } from './api/api';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getTodos({})
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setTodos(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    }, []);

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

    return (
        <div>
            <h1>To Do List</h1>
            <button onClick={() => setModalOpen(true)}>+ New To Do</button>
            <ToDoTable
                todos={todos}
                onUpdate={handleUpdateToDo}
                onDelete={handleDeleteToDo} // Pass the delete callback
            />
            {isModalOpen && (
                <NewToDoModal
                    closeModal={() => setModalOpen(false)}
                    onSave={handleAddToDo}
                />
            )}
        </div>
    );
};

export default App;

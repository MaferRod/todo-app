import React, { useState, useEffect } from 'react';
import ToDoTable from './components/ToDoTable';
import NewToDoModal from './components/NewToDoModal';
import ToDoFilter from './components/ToDoFilter'; // Import the filter component
import { ToDo } from './types/types';
import axios from 'axios'; // Ensure axios is imported
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({ text: '', priority: '', done: '' });
    const [metrics, setMetrics] = useState<any>(null);

    // Fetch todos and metrics whenever filters or todos are updated
    useEffect(() => {
        fetchTodos();
        fetchMetrics();  // Fetch metrics when component mounts
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:9090/todos')
            .then(response => {
                setTodos(response.data.content || []);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    };

    const fetchMetrics = () => {
        axios.get('http://localhost:9090/todos/metrics')
            .then(response => {
                setMetrics(response.data);  // Set the metrics data
            })
            .catch(error => {
                console.error('Error fetching metrics:', error);
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
        setFilters(newFilters); // Apply filters and trigger fetch
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
            <div className="metrics">
    {metrics ? (
        <>
            <p>Average time to finish tasks: {metrics.overallAverage}</p>
            <p>Average time by priority:</p>
            <ul>
                <li>Low: {metrics.lowPriorityAverage}</li>
                <li>Medium: {metrics.mediumPriorityAverage}</li>
                <li>High: {metrics.highPriorityAverage}</li>
            </ul>
        </>
    ) : (
        <p>Loading metrics...</p>
    )}
</div>

        </div>
    );
};

export default App;

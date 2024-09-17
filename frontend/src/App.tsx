import React, { useState, useEffect } from 'react';
import ToDoTable from './components/ToDoTable';
import NewToDoModal from './components/NewToDoModal';
import ToDoFilter from './components/ToDoFilter';
import { ToDo } from './types/types';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({ text: '', priority: '', done: '' });
    const [metrics, setMetrics] = useState<any>(null);

    // Track both priority and due date sorting state
    const [sortByPriority, setSortByPriority] = useState<{ sortBy: string; order: string }>({
        sortBy: 'priority',
        order: 'asc',
    });
    const [sortByDueDate, setSortByDueDate] = useState<{ sortBy: string; order: string }>({
        sortBy: 'dueDate',
        order: 'asc',
    });

    // State to keep track of the currently active sort field
    const [activeSort, setActiveSort] = useState<string>('priority');

    useEffect(() => {
        fetchTodos();
        fetchMetrics();
    }, [filters, sortByPriority, sortByDueDate, activeSort]);

    const fetchTodos = () => {
        const params = {
            text: filters.text || '',
            priority: filters.priority || '',
            done: filters.done !== '' ? filters.done : '',
            sortBy: activeSort === 'priority' ? sortByPriority.sortBy : sortByDueDate.sortBy,
            order: activeSort === 'priority' ? sortByPriority.order : sortByDueDate.order,
        };

        console.log('Fetching todos with params:', params); // Debugging

        axios
            .get('http://localhost:9090/todos', { params })
            .then((response) => {
                setTodos(response.data || []);
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    };

    const fetchMetrics = () => {
        axios
            .get('http://localhost:9090/todos/metrics')
            .then((response) => {
                setMetrics(response.data);
            })
            .catch((error) => {
                console.error('Error fetching metrics:', error);
            });
    };

    // Sort by priority and reset due date sorting
    const handlePrioritySort = () => {
        setActiveSort('priority');
        setSortByPriority((prevSort) => ({
            sortBy: 'priority',
            order: prevSort.order === 'asc' ? 'desc' : 'asc',
        }));
        setSortByDueDate({ sortBy: 'dueDate', order: 'asc' }); // Reset due date sort
    };

    // Sort by due date and reset priority sorting
    const handleDueDateSort = () => {
        setActiveSort('dueDate');
        setSortByDueDate((prevSort) => ({
            sortBy: 'dueDate',
            order: prevSort.order === 'asc' ? 'desc' : 'asc',
        }));
        setSortByPriority({ sortBy: 'priority', order: 'asc' }); // Reset priority sort
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

    const handleClearFilters = () => {
        setFilters({ text: '', priority: '', done: '' });
    };

    return (
        <div>
            <h1>To Do List</h1>
            <ToDoFilter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
            <button onClick={() => setModalOpen(true)}>+ New To Do</button>
            {isModalOpen && (
                <NewToDoModal closeModal={() => setModalOpen(false)} onSave={handleAddToDo} />
            )}
            <ToDoTable
                todos={todos}
                onUpdate={handleUpdateToDo}
                onDelete={handleDeleteToDo}
                onPrioritySort={handlePrioritySort}
                onDueDateSort={handleDueDateSort}
                fetchMetrics={fetchMetrics}
                fetchTodos={fetchTodos}
                currentSort={{
                    sortByPriority,
                    sortByDueDate,
                }}
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

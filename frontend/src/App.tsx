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
    const [sort, setSort] = useState<{ sortBy: string; order: string }[]>([
        { sortBy: 'priority', order: 'asc' },
    ]);

    // Fetch todos and metrics whenever filters or sort state is updated
    useEffect(() => {
        fetchTodos();
        fetchMetrics();
    }, [filters, sort]);

    // Fetch todos from the backend
    const fetchTodos = async () => {
        try {
            const params = {
                text: filters.text || '',
                priority: filters.priority || '',
                done: filters.done !== '' ? filters.done : '',
                sortBy: sort.map(s => s.sortBy).join(','),
                order: sort.map(s => s.order).join(','),
            };

            console.log('Requesting todos with params:', params);

            const response = await axios.get('http://localhost:9090/todos', { params });

            console.log('Fetched todos response:', response.data);

            // Directly use response.data since it's an array
            if (response.data && Array.isArray(response.data)) {
                setTodos(response.data);  // Update todos state with the array
            } else {
                console.log('No todos found');
                setTodos([]);  // Fallback to an empty list if response is empty
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Fetch metrics
    const fetchMetrics = () => {
        axios.get('http://localhost:9090/todos/metrics')
            .then(response => {
                setMetrics(response.data);
            })
            .catch(error => {
                console.error('Error fetching metrics:', error);
            });
    };

    // Sorting handler
    const handleSorting = (sortBy: string) => {
        console.log('Sorting by:', sortBy);

        setSort(prevSort => {
            const currentSort = prevSort.find(s => s.sortBy === sortBy);
            const newOrder = currentSort?.order === 'asc' ? 'desc' : 'asc';

            const newSort = [{ sortBy, order: newOrder }, ...prevSort.filter(s => s.sortBy !== sortBy)];
            console.log('New sort state:', newSort);

            return newSort;
        });
    };

    const handleAddToDo = (newToDo: ToDo) => {
        setTodos(prevTodos => [...prevTodos, newToDo]);
    };

    const handleUpdateToDo = (updatedToDo: ToDo) => {
        console.log('Updating ToDo:', updatedToDo);
        setTodos(prevTodos => prevTodos.map(todo => (todo.id === updatedToDo.id ? updatedToDo : todo)));
    };

    const handleDeleteToDo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const handleFilterChange = (newFilters: { text: string; priority: string; done: string }) => {
        console.log('Applying filters:', newFilters);
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
                Sorting={handleSorting}
                currentSort={sort}
            />
            <div className="metrics">
                {metrics ? (
                    <>
                        <p>Average time to finish tasks: {metrics.overallAverage} minutes</p>
                        <p>Average time by priority:</p>
                        <ul>
                            <li>Low: {metrics.lowPriorityAverage} minutes</li>
                            <li>Medium: {metrics.mediumPriorityAverage} minutes</li>
                            <li>High: {metrics.highPriorityAverage} minutes</li>
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

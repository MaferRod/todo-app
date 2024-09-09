import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ToDo {
    id: string;
    text: string;
    dueDate?: string | null;
    done: boolean;
    doneDate?: string | null;
    priority: 'High' | 'Medium' | 'Low';
    creationDate: string;
}

const ToDoList: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [filter, setFilter] = useState({
        text: '',
        priority: 'All',
        state: 'All',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchToDos();
    }, [filter]);

    const fetchToDos = async () => {
        try {
            const response = await axios.get('/todos', {
                params: {
                    // Assuming the backend supports filtering via query params
                    priority: filter.priority !== 'All' ? filter.priority : undefined,
                    state: filter.state !== 'All' ? filter.state : undefined,
                    text: filter.text || undefined,
                },
            });
            setTodos(response.data);
        } catch (err) {
            setError('Failed to fetch ToDos.');
            console.error(err);
        }
    };

    const handleMarkAsDone = async (id: string) => {
        try {
            await axios.post('/todos/${id}/done');
            fetchToDos(); // Refresh the list after marking as done
        } catch (err) {
            setError('Failed to mark ToDo as done.');
        }
    };

    const handleMarkAsUndone = async (id: string) => {
        try {
            await axios.put('/todos/${id}/undone');
            fetchToDos(); // Refresh the list after marking as undone
        } catch (err) {
            setError('Failed to mark ToDo as undone.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete('/todos/${id}');
            fetchToDos(); // Refresh the list after deletion
        } catch (err) {
            setError('Failed to delete ToDo.');
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    name="text"
                    placeholder="Search by name"
                    value={filter.text}
                    onChange={handleFilterChange}
                    className="px-2 py-1 border rounded mr-2"
                />
                <select name="priority" value={filter.priority} onChange={handleFilterChange} className="px-2 py-1 border rounded mr-2">
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select name="state" value={filter.state} onChange={handleFilterChange} className="px-2 py-1 border rounded">
                    <option value="All">All States</option>
                    <option value="Done">Done</option>
                    <option value="Undone">Undone</option>
                </select>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{todo.text}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{todo.priority}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{todo.dueDate || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => todo.done ? handleMarkAsUndone(todo.id) : handleMarkAsDone(todo.id)}
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                >
                                    {todo.done ? 'Undone' : 'Done'}
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Component */}
            {/* You can add pagination here if needed */}
        </div>
    );
};

export default ToDoList;
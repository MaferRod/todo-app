import React, { useState } from 'react';

type Todo = {
    id: number;
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string; // ISO date string or other date format
};

type ToDoTableProps = {
    todos: Todo[];
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void;
};

const ToDoTable: React.FC<ToDoTableProps> = ({ todos, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<'text' | 'priority' | 'dueDate'>('text');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: 'text' | 'priority' | 'dueDate') => {
        setSortBy(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedTodos = [...todos].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th onClick={() => handleSort('text')}>Text</th>
                    <th onClick={() => handleSort('priority')}>Priority {sortBy === 'priority' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('dueDate')}>Due Date {sortBy === 'dueDate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedTodos.map(todo => (
                    <tr key={todo.id} style={{ backgroundColor: getRowColor(todo.dueDate) }}>
                        <td>{todo.id}</td>
                        <td>{todo.text}</td>
                        <td>{todo.priority}</td>
                        <td>{todo.dueDate}</td>
                        <td>
                            <button onClick={() => onEdit(todo)}>Edit</button>
                            <button onClick={() => onDelete(todo.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const getRowColor = (dueDate: string) => {
    if (!dueDate) return '';
    const dueDateObj = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return 'red';
    if (diffDays <= 14) return 'yellow';
    return 'green';
};

export default ToDoTable;

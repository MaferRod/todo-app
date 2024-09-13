import React, { useState } from 'react';
import { ToDo } from '../types/types';
import EditToDoModal from '../components/EditToDoModal';

type ToDoTableProps = {
    todos: ToDo[];
    onEdit: (todo: ToDo) => void;
    onDelete: (id: number) => void;
    onToggleDone: (id: number) => void;
};

const ToDoTable: React.FC<ToDoTableProps> = ({ todos, onEdit, onDelete, onToggleDone }) => {
    const [sortBy, setSortBy] = useState<'text' | 'priority' | 'dueDate'>('text');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);

    const handleSort = (field: 'text' | 'priority' | 'dueDate') => {
        setSortBy(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedTodos = [...todos].sort((a, b) => {
        const aValue = a[sortBy] || '';
        const bValue = b[sortBy] || '';

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
        } else {
            return aValue < bValue ? 1 : (aValue > bValue ? -1 : 0);
        }
    });

    const handleEdit = (todo: ToDo) => {
        setEditingTodo(todo);
    };

    const handleSave = (todo: ToDo) => {
        onEdit(todo);
        setEditingTodo(null);
    };

    return (
        <div>
            <EditToDoModal 
                todo={editingTodo} 
                isOpen={!!editingTodo} 
                onClose={() => setEditingTodo(null)} 
                onSave={handleSave} 
            />
            <table>
                <thead>
                    <tr>
                        <th>Done</th>
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
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={todo.done} 
                                    onChange={() => onToggleDone(todo.id)} 
                                />
                            </td>
                            <td style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.id}</td>
                            <td style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</td>
                            <td style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.priority}</td>
                            <td style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.dueDate || ''}</td>
                            <td>
                                <button onClick={() => handleEdit(todo)}>Edit</button>
                                <button onClick={() => onDelete(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const getRowColor = (dueDate: string | null) => {
    if (!dueDate) return '';
    const dueDateObj = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return 'red';
    if (diffDays <= 14) return 'yellow';
    return 'green';
};

export default ToDoTable;

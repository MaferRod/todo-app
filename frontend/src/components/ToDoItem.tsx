import React from 'react';

interface Todo {
    id: number;
    name: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ToDoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{todo.name}</td>
            <td>{todo.priority}</td>
            <td>{todo.dueDate || '-'}</td>
            <td>
                <button onClick={() => onEdit(todo.id)}>Edit</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ToDoItem;

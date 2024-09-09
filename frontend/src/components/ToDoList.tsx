import React from 'react';
import TodoItem from './ToDoItem';

interface Todo {
    id: number;
    name: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                ))}
            </tbody>
        </table>
    );
};

export default TodoList;

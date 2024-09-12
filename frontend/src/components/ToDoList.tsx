import React, { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext'; // Ensure correct path
import { ToDo } from '../types/types';

const ToDoList: React.FC = () => {
    const context = useContext(ToDoContext);

    if (!context) {
        throw new Error('ToDoContext is not available');
    }

    const { todos } = context;

    return (
        <div>
            <h1>To Do List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Done</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo: ToDo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.text}</td>
                            <td>{todo.dueDate ? todo.dueDate.toString() : 'No due date'}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.done ? 'Yes' : 'No'}</td>
                            <td>
                                {/* Add actions for edit, delete, etc. */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;

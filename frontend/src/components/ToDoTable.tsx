import React from 'react';
import { ToDo } from '../types/types';
import EditToDoModal from './EditToDoModal';
import { markAsDone, markAsUndone } from '../api/api';

interface ToDoTableProps {
    todos: ToDo[];
    onUpdate: (updatedToDo: ToDo) => void;
    onDelete: (deletedToDoId: number) => void;
}

const ToDoTable: React.FC<ToDoTableProps> = ({ todos, onUpdate, onDelete }) => {
    const [selectedTodo, setSelectedTodo] = React.useState<ToDo | null>(null);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);

    const handleCheckboxChange = (todo: ToDo) => {
        if (todo.done) {
            markAsUndone(todo.id!)
                .then((response) => onUpdate(response.data))
                .catch((error) => console.error('Error marking undone:', error));
        } else {
            markAsDone(todo.id!)
                .then((response) => onUpdate(response.data))
                .catch((error) => console.error('Error marking done:', error));
        }
    };

    const handleEditClick = (todo: ToDo) => {
        setSelectedTodo(todo);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        onDelete(id);
    };

    const handleUpdateToDo = (updatedToDo: ToDo) => {
        onUpdate(updatedToDo);
    };

    // Function to calculate background color based on due date
    const getRowStyle = (dueDate: string | undefined, done: boolean) => {
        if (done) return { textDecoration: 'line-through' }; // Strikethrough for done tasks

        if (!dueDate) return {}; // No background color if no due date

        const currentDate = new Date();
        const due = new Date(dueDate);
        const timeDiff = due.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

        if (daysDiff <= 7) {
            return { backgroundColor: 'red', color: 'white' };
        } else if (daysDiff <= 14) {
            return { backgroundColor: 'yellow', color: 'black' };
        } else {
            return { backgroundColor: 'green', color: 'white' };
        }
    };

    if (todos.length === 0) {
        return <p>No tasks available</p>;
    }

    return (
        <>
            <table className="todo-table">
                <thead>
                    <tr>
                        <th></th> {/* Checkbox column */}
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} style={getRowStyle(todo.dueDate, todo.done)}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleCheckboxChange(todo)}
                                />
                            </td>
                            <td>{todo.text}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.dueDate || '-'}</td>
                            <td>{todo.done ? 'Done' : 'Undone'}</td>
                            <td>
                                <button onClick={() => handleEditClick(todo)}>Edit</button>
                                <button onClick={() => handleDeleteClick(todo.id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && selectedTodo && (
                <EditToDoModal
                    todo={selectedTodo}
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleUpdateToDo}
                />
            )}
        </>
    );
};

export default ToDoTable;

import React, { useState } from 'react';
import { ToDo } from '../types/types';
import EditToDoModal from './EditToDoModal';
import { markAsDone, markAsUndone } from '../api/api';

interface ToDoTableProps {
    todos: ToDo[];
    onUpdate: (updatedToDo: ToDo) => void;
    onDelete: (deletedToDoId: number) => void;
}

const ToDoTable: React.FC<ToDoTableProps> = ({ todos, onUpdate, onDelete }) => {
    const [selectedTodo, setSelectedTodo] = useState<ToDo | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate total pages based on todos length
    const totalPages = Math.ceil(todos.length / itemsPerPage);

    // Calculate visible todos for the current page
    const visibleTodos = todos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                    {visibleTodos.map((todo) => (
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

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

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

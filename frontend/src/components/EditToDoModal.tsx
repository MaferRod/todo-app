// EditToDoModal.tsx
import React, { useState } from 'react';
import { ToDo } from '../types/types';
import { updateTodo } from '../api/api'; // API function to update a todo

interface EditToDoModalProps {
    todo: ToDo | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedToDo: ToDo) => void;
}

const EditToDoModal: React.FC<EditToDoModalProps> = ({ todo, isOpen, onClose, onSave }) => {
    const [text, setText] = useState(todo?.text || '');
    const [priority, setPriority] = useState<ToDo['priority']>(todo?.priority || 'LOW');
    const [dueDate, setDueDate] = useState(todo?.dueDate || '');

    const handleSave = () => {
        if (!todo) return;

        const updatedToDo: Partial<ToDo> = {
            text,
            priority,
            dueDate,
        };

        updateTodo(todo.id!, updatedToDo)
            .then((response) => {
                onSave(response.data); // Pass the updated todo to the parent
                onClose(); // Close the modal
            })
            .catch((error) => {
                console.error('Error updating todo:', error);
            });
    };

    if (!isOpen || !todo) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit To Do</h3>
                <label>Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ToDo['priority'])}
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditToDoModal;

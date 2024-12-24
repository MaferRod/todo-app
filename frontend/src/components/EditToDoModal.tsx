import React, { useState, useEffect } from 'react';
import { ToDo } from '../types/types';
import { updateTodo } from '../api/api';

interface EditToDoModalProps {
    todo: ToDo | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedToDo: ToDo) => void;
}

const EditToDoModal: React.FC<EditToDoModalProps> = ({ todo, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        text: '',
        priority: 'LOW' as ToDo['priority'],
        dueDate: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (todo) {
            setFormData({
                text: todo.text,
                priority: todo.priority,
                dueDate: todo.dueDate || '',
            });
        }
    }, [todo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!todo) return;

        updateTodo(todo.id!, formData)
            .then((response) => {
                onSave(response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error updating todo:', error);
                setError('Failed to update the ToDo. Please try again.');
            });
    };

    if (!isOpen || !todo) return null;

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <h3>Edit To Do</h3>
                {error && <p className="error">{error}</p>}
                <label htmlFor="text">Text</label>
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    aria-label="ToDo text"
                />
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    aria-label="ToDo priority"
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    aria-label="ToDo due date"
                />
                <button onClick={handleSave} aria-label="Save ToDo">Save</button>
                <button onClick={onClose} aria-label="Cancel">Cancel</button>
            </div>
        </div>
    );
};

export default EditToDoModal;

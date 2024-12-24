import React, { useState } from 'react';
import { ToDo } from '../types/types';
import { createTodo } from '../api/api';

interface NewToDoModalProps {
    closeModal: () => void;
    onSave: (todo: ToDo) => void;
}

const NewToDoModal: React.FC<NewToDoModalProps> = ({ closeModal, onSave }) => {
    const [formData, setFormData] = useState({
        text: '',
        priority: 'LOW' as ToDo['priority'],
        dueDate: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const newToDo = {
            ...formData,
            done: false,
        };

        createTodo(newToDo)
            .then((response) => {
                onSave(response.data);
                closeModal();
            })
            .catch((error) => {
                console.error('Error creating To Do:', error.response ? error.response.data : error.message);
                setError('Failed to create the ToDo. Please try again.');
            });
    };

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <h3>New To Do</h3>
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
                <button onClick={closeModal} aria-label="Cancel">Cancel</button>
            </div>
        </div>
    );
};

export default NewToDoModal;

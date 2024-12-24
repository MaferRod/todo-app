import React, { useState } from 'react';
import { createTodo } from '../api/api';
import { ToDo } from '../types/types';

interface NewToDoModalProps {
    closeModal: () => void;
}

const NewToDoModal: React.FC<NewToDoModalProps> = ({ closeModal }) => {
    const [text, setText] = useState<string>('');
    const [priority, setPriority] = useState<ToDo["priority"]>('LOW');
    const [dueDate, setDueDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        const newToDo: Partial<ToDo> = {
            text,
            priority,
            done: false,
            dueDate,
        };

        createTodo(newToDo)
            .then(() => {
                closeModal();
            })
            .catch(error => {
                console.error('Error creating To Do:', error.response ? error.response.data : error.message);
                setError('Failed to create the ToDo. Please try again.');
            });
    };

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <h2>New To Do</h2>
                {error && <p className="error">{error}</p>}
                <label htmlFor="text">Text</label>
                <input
                    type="text"
                    id="text"
                    placeholder="To Do Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    aria-label="To Do Text"
                />
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ToDo["priority"])}
                    aria-label="Priority"
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    aria-label="Due Date"
                />
                <button onClick={handleSave} aria-label="Save ToDo">Save</button>
                <button onClick={closeModal} aria-label="Cancel">Cancel</button>
            </div>
        </div>
    );
};

export default NewToDoModal;
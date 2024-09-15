import React, { useState } from 'react';
import { createTodo } from '../api/api';
import { ToDo } from '../types/types';

interface NewToDoModalProps {
    closeModal: () => void;
}

const NewToDoModal: React.FC<NewToDoModalProps> = ({ closeModal }) => {
    const [text, setText] = useState<string>('');
    const [priority, setPriority] = useState<ToDo["priority"]>('LOW'); // Use uppercase "LOW"
    const [dueDate, setDueDate] = useState<string>(''); // New state for due date

    const handleSave = () => {
        const newToDo: Partial<ToDo> = {
            text,
            priority, // No need to use `toUpperCase()` anymore
            done: false,
            dueDate, // Add due date to the new ToDo object
        };

        createTodo(newToDo)
            .then(() => {
                closeModal(); // Close modal after saving the to-do
            })
            .catch(error => {
                console.error('Error creating To Do:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>New To Do</h2>
                <input
                    type="text"
                    placeholder="To Do Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value as ToDo["priority"])}>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>

                {/* Due Date Input */}
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} // Capture the due date
                />

                <button onClick={handleSave}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default NewToDoModal;

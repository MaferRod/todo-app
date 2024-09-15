// NewToDoModal.tsx
import React, { useState } from 'react';
import { ToDo } from '../types/types';
import { createTodo } from '../api/api';

interface NewToDoModalProps {
    closeModal: () => void;
    onSave: (todo: ToDo) => void;
}

const NewToDoModal: React.FC<NewToDoModalProps> = ({ closeModal, onSave }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<ToDo['priority']>('LOW');
    const [dueDate, setDueDate] = useState<string>('');

    const handleSave = () => {
        const newToDo = {
            text,
            priority,
            done: false,
            dueDate,
        };

        createTodo(newToDo)
            .then((response) => {
                onSave(response.data); // Pass the new todo to the parent
                closeModal(); // Close the modal
            })
            .catch((error) => {
                console.error('Error creating To Do:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>New To Do</h3>
                <label>Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value as ToDo['priority'])}>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <label>Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <button onClick={handleSave}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default NewToDoModal;

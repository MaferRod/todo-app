import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToDo } from '../types/types';

type NewToDoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (todo: Omit<ToDo, 'id'>) => void; // omit 'id' since it's not set at creation
};

const NewToDoModal: React.FC<NewToDoModalProps> = ({ isOpen, onClose, onSave }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSave = () => {
        onSave({ 
            text, 
            priority, 
            dueDate: dueDate || null, // Handle potential empty value
            done: false, 
            creationDate: new Date().toISOString(),
            doneDate: null // Add doneDate with a default value
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Create New To Do</h2>
            <input 
                type="text" 
                placeholder="To Do Text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};

export default NewToDoModal;

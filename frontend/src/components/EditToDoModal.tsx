import React, { useState, useEffect } from 'react';
import { ToDo } from '../types/types';

type EditToDoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (todo: ToDo) => void;
    todo: ToDo | null;
};

const EditToDoModal: React.FC<EditToDoModalProps> = ({ isOpen, onClose, onSave, todo }) => {
    const [text, setText] = useState(todo?.text || '');
    const [priority, setPriority] = useState(todo?.priority || 'Medium');
    const [dueDate, setDueDate] = useState(todo?.dueDate || '');

    useEffect(() => {
        if (todo) {
            setText(todo.text);
            setPriority(todo.priority);
            setDueDate(todo.dueDate || '');
        }
    }, [todo]);

    const handleSave = () => {
        if (todo) {
            onSave({ ...todo, text, priority, dueDate });
            onClose();
        }
    };

    return isOpen && todo ? (
        <div>
            <h2>Edit To Do</h2>
            <input 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)} 
            />
            <select value={priority} onChange={e => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input 
                type="date" 
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)} 
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    ) : null;
};

export default EditToDoModal;

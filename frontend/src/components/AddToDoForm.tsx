import React, { useState } from 'react';
import { createTodo } from '../api/api';
import { ToDo } from '../types/types';

const AddToDoForm: React.FC = () => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<ToDo['priority'] | ''>('');
    const [dueDate, setDueDate] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (text && priority) {
            const newTodo: Partial<ToDo> = {
                text,
                priority,
                dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : undefined,
            };

            createTodo(newTodo)
                .then(() => {
                    setText('');
                    setPriority('');
                    setDueDate('');
                    alert('To-Do added successfully!');
                })
                .catch(error => {
                    console.error('Error adding to-do:', error);
                    alert('Failed to add to-do.');
                });
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Text:</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Priority:</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ToDo['priority'])}
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
            </div>
            <div>
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button type="submit">Add To-Do</button>
        </form>
    );
};

export default AddToDoForm;

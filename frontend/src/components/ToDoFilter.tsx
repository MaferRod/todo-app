import React, { useState } from 'react';

interface ToDoFilterProps {
    onFilterChange: (filters: { text: string; priority: string; done: string }) => void;
}

const ToDoFilter: React.FC<ToDoFilterProps> = ({ onFilterChange }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('');
    const [done, setDone] = useState('');

    const handleSearch = () => {
        onFilterChange({ text, priority, done });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by task name"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">All priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </select>
            <select value={done} onChange={(e) => setDone(e.target.value)}>
                <option value="">All statuses</option>
                <option value="true">Done</option>
                <option value="false">Undone</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default ToDoFilter;

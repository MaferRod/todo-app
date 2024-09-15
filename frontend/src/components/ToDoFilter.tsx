import React, { useState } from 'react';

const ToDoFilter: React.FC<{ onFilter: (filters: any) => void }> = ({ onFilter }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('');
    const [done, setDone] = useState<boolean | undefined>(undefined);

    const handleSearch = () => {
        const filters = {
            text,
            priority: priority !== '' ? priority : undefined,
            done: done !== undefined ? (done ? 'done' : 'undone') : undefined,
        };
        console.log('Filters applied:', filters); // Log the applied filters
        onFilter(filters);
    };
    
    

    return (
        <div>
            <input
                type="text"
                placeholder="Search by text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">All priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </select>
            <select 
                value={done === undefined ? '' : done ? 'done' : 'undone'}
                onChange={(e) => {
                    const value = e.target.value;
                    setDone(value === '' ? undefined : value === 'done');
                }}
            >
                <option value="">All statuses</option>
                <option value="done">Done</option>
                <option value="undone">Undone</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default ToDoFilter;

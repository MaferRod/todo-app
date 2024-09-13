import React, { useState } from 'react';

type SearchFiltersProps = {
    onSearch: (filters: { name?: string; done?: boolean | null; priority?: 'High' | 'Medium' | 'Low' }) => void;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
    const [name, setName] = useState<string>('');
    const [done, setDone] = useState<boolean | null>(null);
    const [priority, setPriority] = useState<'High' | 'Medium' | 'Low' | ''>('');

    const handleSearch = () => {
        onSearch({ name, done, priority: priority || undefined });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search by name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <select value={done !== null ? (done ? 'Done' : 'Undone') : ''} onChange={(e) => setDone(e.target.value === 'Done' ? true : e.target.value === 'Undone' ? false : null)}>
                <option value="">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low' | '')}>
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchFilters;

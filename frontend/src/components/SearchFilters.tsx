import React, { useState } from 'react';
import { SearchParams } from '../types/types';

interface SearchFiltersProps {
    onSearch: (params: SearchParams) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
    const [name, setName] = useState<string>('');
    const [done, setDone] = useState<boolean | null>(null); // null for all, true for done, false for undone
    const [priority, setPriority] = useState<'High' | 'Medium' | 'Low' | undefined>(undefined);

    const handleSearch = () => {
        onSearch({ name, done, priority });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search by name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select 
                onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low' | undefined)} 
                value={priority || ''} // Default to empty string if undefined
            >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select 
                onChange={(e) => setDone(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)} 
                value={done === null ? '' : done.toString()}
            >
                <option value="">All Statuses</option>
                <option value="true">Done</option>
                <option value="false">Undone</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchFilters;

import React from 'react';

interface TodoFiltersProps {
    filters: {
        name: string;
        priority: string;
        state: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        name: string;
        priority: string;
        state: string;
    }>>;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, setFilters }) => {
    return (
        <div>
            <input 
                type="text" 
                value={filters.name} 
                onChange={e => setFilters(prev => ({ ...prev, name: e.target.value }))} 
                placeholder="Name" 
            />
            <select 
                value={filters.priority} 
                onChange={e => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select 
                value={filters.state} 
                onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))}
            >
                <option value="All">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
            </select>
            <button>Search</button>
        </div>
    );
};

export default TodoFilters;

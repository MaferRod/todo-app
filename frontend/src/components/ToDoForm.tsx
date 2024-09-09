import React, { useState } from 'react';
import axios from 'axios';

const ToDoForm: React.FC = () => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the input fields
        if (!text) {
            setError('Text is required.');
            return;
        }

        const newToDo = {
            id: Date.now().toString(),  // Generating a temporary ID, replace with UUID if necessary
            text,
            priority,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            done: false,
            doneDate: null,
            creationDate: new Date().toISOString(),
        };

        try {
            // Send a POST request to the backend to create a new ToDo
            await axios.post('/todos', newToDo);
            // Reset form fields after successful submission
            setText('');
            setPriority('Medium');
            setDueDate(null);
            setError('');
            alert('ToDo item added successfully');
        } catch (err) {
            setError('Failed to add ToDo item.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                    id="text"
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    maxLength={120} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select 
                    id="priority"
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                <input 
                    id="dueDate"
                    type="date" 
                    value={dueDate ?? ''} 
                    onChange={(e) => setDueDate(e.target.value || null)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button 
                type="submit" 
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add ToDo
            </button>
        </form>
    );
};

export default ToDoForm;
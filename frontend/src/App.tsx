import React, { useState } from 'react';
import SearchFilters from './components/SearchFilters';
import NewToDoModal from './components/NewToDoModal';
import ToDoTable from './components/ToDoTable';
import Pagination from './components/Pagination';
import Metrics from './components/Metrics';
import { ToDo, SearchParams } from './types/types';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handleSearch = (filters: SearchParams) => {
        // Implement search logic here
        console.log(filters);
    };

    const handleSaveTodo = (todoData: Omit<ToDo, 'id'>) => {
        const newTodo: ToDo = {
            id: todos.length + 1,
            ...todoData,
            done: false,
            creationDate: new Date().toISOString(),
        };
        setTodos([...todos, newTodo]);
        setIsModalOpen(false);
    };
    

    const handleEditTodo = (todo: Omit<ToDo, 'done' | 'creationDate'>) => {
        const updatedTodos = todos.map(t => (t.id === todo.id ? { ...t, ...todo } : t));
        setTodos(updatedTodos);
    };
    

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optionally fetch new todos for the selected page
    };

    return (
        <div>
            <SearchFilters onSearch={handleSearch} />
            <button onClick={() => setIsModalOpen(true)}>New To Do</button>
            <NewToDoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveTodo} 
            />
            <Metrics todos={todos} />
            <ToDoTable 
                todos={todos} 
                onEdit={handleEditTodo} 
                onDelete={handleDeleteTodo} 
            />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};

export default App;

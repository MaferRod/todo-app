import React, { useState } from 'react';
import TodoList from './components/ToDoList';
import TodoFilters from './components/ToDoFilters';
import TodoStats from './components/ToDoStats';
import './styles/App.css';  // Importa el archivo de estilos

interface Todo {
    id: number;
    name: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    completed: boolean;
}
const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, name: 'Task 1', priority: 'Low', dueDate: '', completed: false },
        { id: 2, name: 'Task 2', priority: 'High', dueDate: '2022-02-02', completed: false },
        { id: 3, name: 'Task 3', priority: 'Medium', dueDate: '2023-02-02', completed: true },
    ]);

    const [filters, setFilters] = useState({
        name: '',
        priority: 'All',
        state: 'All'
    });

    const handleEdit = (id: number) => {
        console.log('Edit task', id);
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        return (
            (filters.priority === 'All' || todo.priority === filters.priority) &&
            (filters.state === 'All' || (filters.state === 'Done' && todo.completed) || (filters.state === 'Undone' && !todo.completed)) &&
            todo.name.includes(filters.name)
        );
    });

    return (
        <div className="container">
            <div className="header">
                <TodoFilters filters={filters} setFilters={setFilters} />
                <button>New To Do</button>
            </div>
            <div className="table-container">
                <TodoList todos={filteredTodos} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <div className="pagination">
                <a href="#">«</a>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">…</a>
                <a href="#">10</a>
                <a href="#">»</a>
            </div>
            <TodoStats todos={todos} />
        </div>
    );
};

export default TodoApp;

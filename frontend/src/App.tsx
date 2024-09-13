import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, markAsDone, markAsUndone } from './todoService';
import { ToDo } from './types/types';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [newTodoText, setNewTodoText] = useState<string>('');
    const [newTodoPriority, setNewTodoPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
    const [newTodoDueDate, setNewTodoDueDate] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await fetchTodos({});
                setTodos(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        loadTodos();
    }, []);

    const handleCreateTodo = async () => {
        const newTodo: ToDo = {
            id: todos.length + 1,
            text: newTodoText,
            done: false,
            creationDate: new Date().toISOString(),
            doneDate: null,
            priority: newTodoPriority,
            dueDate: newTodoDueDate,
        };
        try {
            const createdTodo = await createTodo(newTodo);
            setTodos([...todos, createdTodo]);
            setNewTodoText('');
            setNewTodoPriority('Medium');
            setNewTodoDueDate(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleUpdateTodo = async (id: number, updatedTodo: ToDo) => {
        try {
            const newTodo = await updateTodo(id.toString(), updatedTodo);
            const updatedTodos = todos.map((todo) => (todo.id === id ? newTodo : todo));
            setTodos(updatedTodos);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleMarkAsDone = async (id: number) => {
        try {
            await markAsDone(id.toString());
            const updatedTodos = todos.map((todo) =>
                todo.id === id ? { ...todo, done: true, doneDate: new Date().toISOString() } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleMarkAsUndone = async (id: number) => {
        try {
            await markAsUndone(id.toString());
            const updatedTodos = todos.map((todo) =>
                todo.id === id ? { ...todo, done: false, doneDate: null } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h1>ToDo List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Enter new todo"
            />
            <select value={newTodoPriority} onChange={(e) => setNewTodoPriority(e.target.value as 'High' | 'Medium' | 'Low')}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input
                type="date"
                value={newTodoDueDate || ''}
                onChange={(e) => setNewTodoDueDate(e.target.value || null)}
            />
            <button onClick={handleCreateTodo}>Add Todo</button>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.text} - {todo.done ? 'Done' : 'Pending'}
                            <button onClick={() => handleMarkAsDone(todo.id)}>Mark as Done</button>
                            <button onClick={() => handleMarkAsUndone(todo.id)}>Mark as Undone</button>
                        </li>
                    ))
                ) : (
                    <p>No todos available</p>
                )}
            </ul>
        </div>
    );
};

export default App;

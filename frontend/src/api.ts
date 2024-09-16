// api.ts
export const fetchTodos = async () => {
    const response = await fetch('http://localhost:8080/api/todos');
    return response.json();
};
// types.ts o api.ts
export interface ToDo {
    id: number;
    text: string;
    dueDate?: string; // Opcional
    done: boolean;
    doneDate?: string; // Opcional
    priority: 'High' | 'Medium' | 'Low';
    creationDate: string;
}

export const createTodo = async (todo: Partial<ToDo>) => {
    const response = await fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return response.json();
};

export const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
    });
};

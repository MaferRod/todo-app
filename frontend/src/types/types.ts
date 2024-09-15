// src/types/types.ts
export interface ToDo {
    id?: number;
    text: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW'; // Use uppercase values to match the backend
    done: boolean;
    doneDate?: string;
    dueDate?: string;
    creationDate?: string;
}



// types.ts (or wherever your type definitions are centralized)

export type SearchParams = {
    name?: string;
    done?: boolean | null;
    priority?: 'High' | 'Medium' | 'Low'; // Ensure this matches exactly
};


export type Todo = Omit<ToDo, 'done' | 'creationDate' | 'doneDate'>;
export const BACKEND_URL = 'http://localhost:9090';
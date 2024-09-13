// types/types.ts
export type ToDo = {
    id: number;
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string | null; // ISO date string or other date format
    done: boolean;
    creationDate: string; // ISO date string
    doneDate: string | null; // Updated to accept null
};

// types.ts (or wherever your type definitions are centralized)

export type SearchParams = {
    name?: string;
    done?: boolean | null;
    priority?: 'High' | 'Medium' | 'Low'; // Ensure this matches exactly
};


export type Todo = Omit<ToDo, 'done' | 'creationDate' | 'doneDate'>;
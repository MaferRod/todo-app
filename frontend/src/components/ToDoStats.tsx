import React from 'react';

interface Todo {
    id: number;
    name: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    completed: boolean;
}

interface TodoStatsProps {
    todos: Todo[];
}

const ToDoStats: React.FC<TodoStatsProps> = ({ todos }) => {
    const averageTime = '22:15 minutes';
    const timeByPriority = {
        Low: '10:25 mins',
        Medium: '10:25 mins',
        High: '10:25 mins'
    };

    return (
        <div>
            <div>Average time to finish tasks: {averageTime}</div>
            <div>Average time to finish tasks by priority:</div>
            <ul>
                <li>Low: {timeByPriority.Low}</li>
                <li>Medium: {timeByPriority.Medium}</li>
                <li>High: {timeByPriority.High}</li>
            </ul>
        </div>
    );
};

export default ToDoStats;

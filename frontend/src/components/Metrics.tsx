// src/components/Metrics.tsx
import React from 'react';
import { ToDo } from '../types/types';

type MetricsProps = {
  todos: ToDo[];
};

const Metrics: React.FC<MetricsProps> = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.done).length;

  return (
    <div>
      <p>Total To Dos: {totalTodos}</p>
      <p>Completed To Dos: {completedTodos}</p>
      <p>Pending To Dos: {totalTodos - completedTodos}</p>
    </div>
  );
};

export default Metrics;

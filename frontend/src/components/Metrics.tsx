// components/Metrics.tsx
import React from "react";

const Metrics: React.FC = () => {
  return (
    <div className="metrics">
      <div>Average time to finish tasks: <strong>22:15 minutes</strong></div>
      <div>Average time to finish tasks by priority:</div>
      <ul>
        <li>Low: 10:25 mins</li>
        <li>Medium: 10:25 mins</li>
        <li>High: 10:25 mins</li>
      </ul>
    </div>
  );
};

export default Metrics;

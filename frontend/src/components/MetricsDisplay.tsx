import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Metrics {
    overallAverage: number;
    highPriorityAverage: number;
    mediumPriorityAverage: number;
    lowPriorityAverage: number;
}

const MetricsDisplay: React.FC = () => {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await axios.get('http://localhost:9090/todos/metrics');
            setMetrics(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching metrics:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading metrics...</div>;
    }

    if (!metrics) {
        return <div>Failed to load metrics.</div>;
    }

    return (
        <div className="metrics-container">
            <h3>Average Completion Times</h3>
            <div>
                <strong>Overall Average Time:</strong> {metrics.overallAverage} minutes
            </div>
            <div>
                <strong>Average Time by Priority:</strong>
                <ul>
                    <li>High: {metrics.highPriorityAverage} minutes</li>
                    <li>Medium: {metrics.mediumPriorityAverage} minutes</li>
                    <li>Low: {metrics.lowPriorityAverage} minutes</li>
                </ul>
            </div>
        </div>
    );
};

export default MetricsDisplay;

import React, { useEffect, useState, useCallback } from 'react';
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
    const [error, setError] = useState<string | null>(null);

    const fetchMetrics = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:9090/todos/metrics');
            setMetrics(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching metrics:', error);
            setError('Failed to load metrics. Please try again later.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    if (loading) {
        return <div>Loading metrics...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!metrics) {
        return <div>No metrics available.</div>;
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
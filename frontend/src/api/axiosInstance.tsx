// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090', // Replace with your backend URL if necessary
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
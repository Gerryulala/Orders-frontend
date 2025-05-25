import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// Agrega token automáticamente a todas las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
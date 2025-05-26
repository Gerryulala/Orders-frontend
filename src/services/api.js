import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 👈 dinámico por entorno
    withCredentials: true, // opcional: si usas cookies o CORS con auth
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
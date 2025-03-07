import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Создаем экземпляр axios с базовым URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Автоматически добавляем токен в заголовки, если он есть
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default axiosInstance;

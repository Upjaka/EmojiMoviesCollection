import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Создаем экземпляр axios с базовым URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access');

    if (!config.url.includes('/register/') && !config.url.includes('/login/')) {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, error => Promise.reject(error));


const refreshTokens = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      if (!refreshToken) throw new Error('Refresh token отсутствует');
      
      const response = await axios.post('/token/refresh/', { refresh: refreshToken });
      
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      
      return response.data.access;
    } catch (err) {
      console.error('Ошибка обновления токенов', err);
      return null;
    }
  };
  
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401 && error.response.data.message === 'Token is expired') {
        const newAccessToken = await refreshTokens();
        
        if (newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;

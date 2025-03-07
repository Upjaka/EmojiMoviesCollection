import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Создаем экземпляр axios с базовым URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// // Автоматически добавляем токен в заголовки, если он есть
// axiosInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem('access');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => Promise.reject(error));

// Функция для обновления токенов
const refreshTokens = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      if (!refreshToken) throw new Error('Refresh token отсутствует');
      
      const response = await axios.post('/token/refresh/', { refresh: refreshToken });
      
      // Сохраняем новые токены
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      
      return response.data.access; // Возвращаем новый access token
    } catch (err) {
      console.error('Ошибка обновления токенов', err);
      return null;
    }
  };
  
  // Перехватчик для обработки истекших токенов
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401 && error.response.data.message === 'Token is expired') {
        // Если токен истек, пробуем обновить токен
        const newAccessToken = await refreshTokens();
        
        if (newAccessToken) {
          // Повторяем запрос с новым access token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config); // Повторяем запрос с новым токеном
        }
      }
      return Promise.reject(error); // Если ошибка не из-за истекшего токена, отдаем ошибку
    }
  );

export default axiosInstance;

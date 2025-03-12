import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Создаем экземпляр axios с базовым URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Интерсептор запросов: добавляет токен, если он есть
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        // Исключаем эндпоинт обновления токена
        if (!config.url.includes("/register/") && 
            !config.url.includes("/login/") && 
            !config.url.includes("/token/refresh/")) {
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Функция обновления токенов
const refreshTokens = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("Refresh token отсутствует");

        // Используем axios (не axiosInstance!) без Authorization заголовка
        const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
        });

        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        return response.data.access;
    } catch (err) {
        console.error("Ошибка обновления токенов", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
};

// Интерсептор ответов: если 401, пробуем обновить токен
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Ошибка 401, пробуем обновить токен...");

            const newAccessToken = await refreshTokens();
            if (newAccessToken) {
                // Создаем новый объект запроса
                const newRequest = {
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                };
                return axiosInstance(newRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

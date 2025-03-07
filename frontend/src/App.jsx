import { useState } from 'react';
import './App.css';
import MoviesList from './components/MovieList';
import AuthModal from './components/AuthModal';

import axiosInstance from './axiosInstance';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');  // Добавлено поле для подтверждения пароля
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post('/token/', {
        username,
        password,
      });

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      setIsAuthenticated(true);
      setError('');
      closeModal();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Неверный логин или пароль');
        } else {
          setError(err.response.data?.message || 'Ошибка входа');
        }
      } else {
        setError('Ошибка сети или сервера');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== password2) {
      setError('Пароли не совпадают');
      return;
    }
  
    try {
      const { data } = await axiosInstance.post('/register/', {
        username,
        password,
      });
  
      console.log('Успешная регистрация:', data); // Проверяем, что возвращает сервер
  
      setIsRegistering(false);
      setError(null); // Очищаем ошибки, если всё прошло успешно
  
    } catch (err) {
      console.error('Ошибка регистрации:', err.response?.data || err.message);
  
      if (err.response) {
        setError(err.response.data?.detail || 'Ошибка регистрации');
      } else {
        setError('Ошибка сети или сервера');
      }
    }
  };
  

  return (
    <>
      <div className="App">
        <header className="header">
          <div className="logo">Фильмовый Портал</div>
          <button className="login-btn" onClick={openModal}>Вход</button>
        </header>
      </div>
      <div className="card">
        <h1>Список фильмов</h1>
        <MoviesList />
      </div>

      {/* Модальное окно для входа */}
      <AuthModal 
        isModalOpen={isModalOpen} 
        closeModal={closeModal} 
        handleLogin={handleLogin} 
        handleRegister={handleRegister} 
      />
    </>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import MoviesList from './components/MovieList';
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            
            {/* Переключение между формами */}
            {isRegistering ? (
              <>
                <h2>Регистрация</h2>
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Подтверждение пароля</label>
                    <input
                      type="password"
                      id="password2"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit">Зарегистрироваться</button>
                </form>
                <p>
                  <span onClick={() => setIsRegistering(false)} className="clickable-text">Уже есть аккаунт? Войти</span>
                </p>
              </>
            ) : (
              <>
                <h2>Вход</h2>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit">Войти</button>
                </form>
                <p>
                  <span onClick={() => setIsRegistering(true)} className="clickable-text">Еще нет аккаунта? Зарегистрируйся</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

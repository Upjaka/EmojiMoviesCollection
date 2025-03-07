import { useState } from 'react';
import './App.css';
import MoviesList from './components/MovieList';
import axiosInstance from './axiosInstance';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const { data } = await axiosInstance.post('/token/', { 
            username, 
            password 
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
              <h2>Вход</h2>
              <form onSubmit={handleSubmit}>
                {/* Поле для имени пользователя */}
                <div className="form-group">
                  <label htmlFor="username">Имя пользователя</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* Поле для пароля */}
                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* Ошибка валидации */}
                {error && <p className="error-message">{error}</p>}
                {/* Кнопка для отправки формы */}
                <button type="submit" className="submit-btn">Войти</button>
              </form>
            </div>
          </div>
        )}
    </>
  );
}

export default App;

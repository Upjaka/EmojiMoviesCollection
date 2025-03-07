import React, { useState } from 'react';

const AuthModal = ({ isModalOpen, closeModal, handleLogin, handleRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== password2) {
        setError('Пароли не совпадают');
        return;
      }
      await handleRegister(username, password, setError);
    } else {
      await handleLogin(username, password, setError);
    }
  };

  if (!isModalOpen) return null; // Если модалка закрыта, не рендерим

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>&times;</span>
        
        {isRegistering ? (
          <>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
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
              <span onClick={() => setIsRegistering(false)} className="clickable-text">
                Уже есть аккаунт? Войти
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
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
              <span onClick={() => setIsRegistering(true)} className="clickable-text">
                Еще нет аккаунта? Зарегистрируйся
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

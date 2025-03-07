import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoviesList from './components/MovieList'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Простая валидация формы
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Здесь можно обработать отправку данных (например, API)
    console.log('Вход с почтой:', email, 'и паролем:', password);

    // После успешной отправки закрываем модальное окно
    closeModal();
  };

  const [count, setCount] = useState(0)

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
    </>
  )
}

export default App

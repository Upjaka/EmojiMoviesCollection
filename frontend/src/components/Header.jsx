import { useState } from "react";
import "../styles/Header.css";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/authSlice"; // Импортируем асинхронные операции

const Header = () => {
  const logoSrc = "/logo.png";
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth); // Извлекаем данные из Redux

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async (username, password, setError) => {
    try {
      const action = await dispatch(login({ username, password }));
      if (action.error) {
        setError(action.error.message);
      } else {
        closeModal();
      }
    } catch (err) {
      setError("Ошибка входа");
    }
  };

  const handleRegister = async (username, password, setError) => {
    try {
      const action = await dispatch(register({ username, password }));
      if (action.error) {
        setError(action.error.message);
      } else {
        setIsRegistering(false); // Сменить на экран входа
      }
    } catch (err) {
      setError("Ошибка регистрации");
    }
  };

  return (
    <header className="py-4">
      <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logoSrc} alt="Logo" className="img-logo me-2" />
          <h3 className="display-4 fw-bolder text-title m-0">Emoji Movies</h3>
        </div>
        <button className="btn-login" onClick={openModal}>
          <span>Вход</span>
        </button>
      </div>

      {/* Модальное окно для входа и регистрации */}
      <AuthModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={error} // Передаем ошибку из Redux
      />
    </header>
  );
};

export default Header;

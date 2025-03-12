import { useState } from "react";
import "../styles/Header.css";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, register } from "../store/authSlice";

const Header = () => {
  const logoSrc = "/logo.png";
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

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
      setError(action.error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleRegister = async (username, password, setError) => {
    try {
      const action = await dispatch(register({ username, password }));
      if (action.error) {
        setError(action.error.message);
      } else {
        setIsRegistering(false);
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
        {isAuthenticated ? (
          <div class="dropdown">
          <button class="btn btn-primary btn-login" type="button" id="dropdownProfileButton" data-bs-toggle="dropdown" aria-expanded="false">
            Профиль
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownProfileButton">
            <li><button class="dropdown-item" type="button">
              <span className="text text-white">Мой профиль</span>
            </button></li>
            <li><hr className="text-white"/></li>
            <li><button class="dropdown-item" type="button">
              <span className="text text-white" onClick={handleLogout}>Выйти</span>
            </button></li>
          </ul>
        </div>
        ) : (
          <button className="btn-login" onClick={openModal}>
            <span>Вход</span>
          </button>
        )}
      </div>

      <AuthModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={error}
      />
    </header>
  );
};

export default Header;

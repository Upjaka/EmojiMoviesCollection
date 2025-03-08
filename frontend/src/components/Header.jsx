import { useState } from "react";
import "../styles/Header.css";
import AuthModal from "./AuthModal";
import axiosInstance from "../axiosInstance";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleLogin = async (username, password, setError) => {
    try {
      const { data } = await axiosInstance.post("/token/", { username, password });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setIsAuthenticated(true);
      setError("");
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка входа");
    }
  };

  const handleRegister = async (username, password, setError) => {
    try {
      const { data } = await axiosInstance.post("/register/", { username, password });

      console.log("Успешная регистрация:", data);
      setIsRegistering(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || "Ошибка регистрации");
    }
  };

  return (
    <header className="bg-dark py-4">
      <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
        <h2 className="display-4 fw-bolder text-white m-0">Emoji Films</h2>
        <button className="btn btn-light login-btn" onClick={openModal}>
          Вход
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
      />
    </header>
  );
};

export default Header;

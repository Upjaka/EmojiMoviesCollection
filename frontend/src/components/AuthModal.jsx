import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Модальное окно для успешной регистрации
const SuccessModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Регистрация успешна!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Вы успешно зарегистрированы! Пожалуйста, войдите в систему.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Закрыть
      </Button>
    </Modal.Footer>
  </Modal>
);

const AuthModal = ({ isModalOpen, closeModal, isRegistering, setIsRegistering, handleLogin, handleRegister, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== password2) {
        return;
      }
      await handleRegister(username, password);
      setIsSuccessModalOpen(true); // Показываем окно успеха
    } else {
      await handleLogin(username, password);
    }
  };

  return (
    <>
      {/* Модальное окно для входа и регистрации */}
      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isRegistering ? "Регистрация" : "Вход"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isRegistering && (
              <Form.Group className="mb-3">
                <Form.Label>Подтверждение пароля</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="w-100">
              {isRegistering ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <p className="w-100 mb-0 text-center">
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Уже есть аккаунт? Войти"
                : "Еще нет аккаунта? Зарегистрируйся"}
            </span>
          </p>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно успеха */}
      <SuccessModal show={isSuccessModalOpen} onHide={closeSuccessModal} />
    </>
  );
};

export default AuthModal;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AuthModal = ({ isModalOpen, closeModal, isRegistering, setIsRegistering, handleLogin, handleRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== password2) {
        setError("Пароли не совпадают");
        return;
      }
      await handleRegister(username, password, setError);
    } else {
      await handleLogin(username, password, setError);
    }
  };

  return (
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
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Уже есть аккаунт? Войти" : "Еще нет аккаунта? Зарегистрируйся"}
          </span>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;

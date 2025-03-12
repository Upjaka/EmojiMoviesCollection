import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../axiosInstance";

const ProfileModal = ({ isModalOpen, closeModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    try {
      const response = await axiosInstance.post("/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });

      if (response.status === 200) {
        setSuccess("Пароль успешно изменен!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      }
    } catch (error) {
      setError("Ошибка при смене пароля.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Мой профиль</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-info">
          <p><strong>Имя пользователя:</strong> exampleUser</p>
          <p><strong>Электронная почта:</strong> example@mail.com</p>
        </div>

        <h5>Сменить пароль</h5>
        <Form>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}


          <Form.Group className="mb-3" controlId="formCurrentPassword">
            
            <Form.Label>Текущий пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите текущий пароль"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNewPassword">
            
            <Form.Label>Новый пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Подтвердите новый пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Повторите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handlePasswordChange}>
            Сменить пароль
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

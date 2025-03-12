import React, { useState } from "react";
import { Modal, Button, Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import MoviePreview from "./MoviePreview"; // Импортируем новый компонент
import "../styles/profileModal.css";

const ProfileModal = ({ isModalOpen, closeModal }) => {
  const userReactions = useSelector((state) => state.userReactions.reactions);
  const movies = useSelector((state) => state.movies.movies);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueMovies = Array.from(
    new Set(userReactions.map((reaction) => reaction.movie))
  ).map((id) => movies.find((movie) => movie.id === id));

  const totalPages = Math.ceil(uniqueMovies.length / itemsPerPage);


  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;

  const currentMovies = uniqueMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Мой профиль</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-info">
          <p><strong>Имя пользователя:</strong> exampleUser</p>
          <p><strong>Электронная почта:</strong> example@mail.com</p>

          <hr />
          <div className="favorites-movies">
            <div className="favorites-movies-title">
              <span>Фильмы, на которые Вы реагировали</span>
            </div>

            <div className="favorites-movies-list mt-3">
              {currentMovies.length > 0 ? (
                currentMovies.map((movie) => (
                  <MoviePreview
                    key={movie.id}
                    movie={movie}
                    reactions={userReactions}
                  />
                ))
              ) : (
                <p>Вы еще не оставили реакции на фильмы.</p>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-3">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

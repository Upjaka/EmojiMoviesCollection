import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setSelectedMovie } from "../store/moviesSlice";

const MovieModal = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);

  const handleClose = () => {
    dispatch(setSelectedMovie(null));
  };

  if (!selectedMovie) return null;

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Год выпуска:</strong> {selectedMovie.year}</p>
        <p><strong>Жанр:</strong> {selectedMovie.genre}</p>
        <p><strong>Описание:</strong> {selectedMovie.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;

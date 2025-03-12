import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setSelectedMovie } from "../store/moviesSlice";

import "../styles/modal.css";
import "../styles/MovieModal.css";


const MovieModal = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);

  const handleClose = () => {
    dispatch(setSelectedMovie(null));
  };

  const emojiMap = {
    like: '👍',
    funny: '🤣',
    love: '😍',
    sad: '😢',
    shocked: '😱',
    mindblown: '🤯',
    respect: '🫵',
    dislike: '👎',
    clown: '🤡',
    poop: '💩',
    heart: '❤️',
    thinking: '🤔',
    angry: '😡',
    fire: '🔥',
    ghost: '👻'
  };

  if (!selectedMovie) return null;
  

  return (
    <Modal show={true} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-card">
            <div className="modal-info">
                <p><strong>Год выпуска:</strong> {selectedMovie.year}</p>
                <p><strong>Жанры:</strong> {selectedMovie.genres}</p>
                <p><strong>Режиссер:</strong> {selectedMovie.director}</p>
            </div>
            <div className="modal-poster">
                <img src={selectedMovie.poster} alt={`${selectedMovie.title} Poster`} />
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="reactions-container">
            {Object.entries(selectedMovie.reactions_count).map(([reaction, count]) => (
                <div key={reaction} className="reaction-item">
                    <span className="reaction-icon">{emojiMap[reaction]}</span>
                    <span className="reaction-count">{count}</span>
                </div>
            ))}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;

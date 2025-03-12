import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setSelectedMovie } from "../store/moviesSlice";
import axiosInstance from "../axiosInstance";

import "../styles/modal.css";
import "../styles/MovieModal.css";


const MovieModal = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const [userReactions, setUserReactions] = useState([]);

  useEffect(() => {
    if (selectedMovie) {
      const fetchReactions = async () => {
        try {
          const response = await axiosInstance.get("/reactions/");
          setUserReactions(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке реакций пользователя:", error);
        }
      };

      fetchReactions();
    }
  }, [selectedMovie]);

  const handleClose = () => {
    dispatch(setSelectedMovie(null));
  };

  const handleReactionClick = async (reaction) => {
    if (!selectedMovie) return;
  
    try {
      const isReactionAlreadySet = isUserReaction(reaction);
  
      if (isReactionAlreadySet) {
        // Удаляем реакцию, если она уже была поставлена
        await axiosInstance.delete(`/reactions/${selectedMovie.id}/${reaction}/`);
  
        // Обновляем счетчик реакций
        const updatedReactions = {
          ...selectedMovie.reactions_count,
          [reaction]: selectedMovie.reactions_count[reaction] - 1,
        };
  
        dispatch(setSelectedMovie({ ...selectedMovie, reactions_count: updatedReactions }));
      } else {
        // Добавляем новую реакцию
        const response = await axiosInstance.post("/reactions/", {
          movie: selectedMovie.id,
          reaction: reaction,
        });
  
        if (response.status === 201) {
          // Обновляем счетчик реакций
          const updatedReactions = {
            ...selectedMovie.reactions_count,
            [reaction]: (selectedMovie.reactions_count[reaction] || 0) + 1,
          };
  
          dispatch(setSelectedMovie({ ...selectedMovie, reactions_count: updatedReactions }));
        }
      }
    } catch (error) {
      console.error("Ошибка при отправке/удалении реакции:", error);
    }
  };
  

  const isUserReaction = (reaction) => {
    return userReactions.some(
      (reactionObj) =>
        reactionObj.movie === selectedMovie.id && reactionObj.reaction === reaction
    );
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
        <div className="modal-reactions-container">
            {Object.entries(selectedMovie.reactions_count).map(([reaction, count]) => (
                <div 
                    key={reaction}
                    className={`modal-reaction-item ${isUserReaction(reaction) ? "selected" : ""}`}
                    onClick={() => handleReactionClick(reaction)}
                >
                    <span className="modal-reaction-icon">{emojiMap[reaction]}</span>
                    <span className="modal-reaction-count">{count}</span>
                </div>
            ))}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;

import React from "react";
import { Card } from "react-bootstrap";

const MoviePreview = ({ movie, reactions }) => {
  // Фильтруем все реакции для данного фильма
  const reactionsForMovie = reactions.filter(
    (reaction) => reaction.movie === movie.id
  );

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

  return (
    <div className="movie-preview p-0">
      <img
        src={movie.poster}
        alt={movie.title}
        className="preview-movie-poster"
      />
      <div className="preview-movie-info">
        
        {reactionsForMovie.length > 0 ? (
          <div className="reaction-icons">
            {reactionsForMovie.map((reaction, index) => (
              <span key={index} className="preview-reaction-icon">
                {emojiMap[reaction.reaction] || "Нет реакции"}
              </span>
            ))}
          </div>
        ) : (
          <p>Нет реакций на этот фильм.</p>
        )}
      </div>
    </div>
  );
};

export default MoviePreview;

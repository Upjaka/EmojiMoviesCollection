import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../store/moviesSlice";

import "../styles/MovieListItem.css";

const MovieListItem = ({ id, title, year, genres, director, poster, reactions_count }) => {
  
  const genreList = genres.split(',');

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

  const topReactions = Object.entries(reactions_count).slice(0, 4);

  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setSelectedMovie({ id, title, year, poster, genres, director, reactions_count }));
  }, [dispatch, id, title, year, poster, genres, director, reactions_count]);

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={poster} alt={title} className="movie-poster" />
      <div className="movie-details">
        <div className="movie-title-container">
          <span className="movie-title">{title}</span>
          <span className="movie-year">{year}</span>
        </div>
        <div className="movie-genres">
          {(genreList.length > 3) ? genreList.slice(0, 3).join(", ") + " и др." : genreList.join(", ")}
        </div>

        <div className="movie-reactions">
          <div className="reactions-container">
            {topReactions.map(([reaction, count]) => (
              <div key={reaction} className="reaction-item">
                <span className="reaction-icon">{emojiMap[reaction]}</span>
                <span className="reaction-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;

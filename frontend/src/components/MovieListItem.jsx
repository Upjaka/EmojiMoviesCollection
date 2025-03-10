import React from "react";
import "./MovieListItem.css"

const MovieListItem = ({ title, year, genres, poster }) => {
    const genreList = genres.split(',').slice(0, 3);
  
    return (
      <div className="movie-card">
        <img src={poster} alt={title} className="movie-poster" />
        <div className="movie-details">
          <div className="movie-title-container">
            <span className="movie-title">{title}</span>
            <span className="movie-year">{year}</span>
          </div>
          <div className="movie-genres">
            {genreList.join(", ")}
          </div>
        </div>
      </div>
    );
  };
  

export default MovieListItem;

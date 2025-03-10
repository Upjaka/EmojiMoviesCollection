import React from "react";
import "./MovieListItem.css"

const MovieCard = ({ title, year, genres, poster }) => {
  return (
    <div className="movie-card bg-white shadow-lg rounded-xl overflow-hidden max-w-xs">
      {/* Постер с фиксацией размера */}
      <div className="bg-gray-200 flex items-center justify-center">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="movie-card-img object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg">Нет постера</span>
        )}
      </div>

      {/* Информация */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {title} <span className="text-gray-500">({year})</span>
        </h3>
        <p className="text-gray-600 text-sm mt-2 truncate">
          {genres.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

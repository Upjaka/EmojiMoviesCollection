import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";

const API_URL = "http://127.0.0.1:8000/api/movies/";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  return (
    <div className="w-100 movies-container">
      {movies.map((movie, index) => (
        <MovieListItem key={index} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;

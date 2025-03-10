import React from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";

const movies = [
  {
    title: "Иногда они возвращаются",
    year: 1991,
    genres: ["ужасы", "триллер", "драма"],
    poster:
      "https://image.openmoviedb.com/kinopoisk-images/1629390/2bda38b4-a2d2-4491-bf18-47b7589ad816/orig",
  },
  {
    title: "Кинчем — мое сокровище",
    year: 2017,
    genres: ["драма", "мелодрама", "приключения", "история"],
    poster:
      "https://image.openmoviedb.com/kinopoisk-images/4774061/6f530e10-d595-4cc2-bdde-c88521e55d07/orig",
  },
];

const MovieList = () => {
  return (
    <div className="w-100 movies-container">
      {movies.map((movie, index) => (
        <MovieListItem key={index} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;

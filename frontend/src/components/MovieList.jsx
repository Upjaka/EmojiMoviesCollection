import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";
import FiltersBar from "./FiltersBar";

const API_URL = "http://127.0.0.1:8000/api/movies/";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");

  const uniqueYears = [
    "all",
    ...new Set(movies.map((movie) => movie.year.toString()).sort((a, b) => b - a)),
  ];

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    let filtered = movies;

    if (year !== "all") {
      filtered = movies.filter((movie) => movie.year.toString() === year);
    }
    setFilteredMovies(filtered);
  };

  return (
    <div className="w-100 p-0">

        <FiltersBar onSearch={handleSearch} onYearSelect={handleYearChange} uniqueYears={uniqueYears} />
        <div className="w-100 movies-container">
        {filteredMovies.map((movie, index) => (
            <MovieListItem key={index} {...movie} />
        ))}
        </div>
    </div>

  );
};

export default MovieList;

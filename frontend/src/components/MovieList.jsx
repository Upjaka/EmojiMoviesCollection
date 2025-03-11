import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";
import FiltersBar from "./FiltersBar";

const API_URL = "http://127.0.0.1:8000/api/movies/";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const uniqueYears = [
    "all",
    ...new Set(movies.map((movie) => movie.year.toString()).sort((a, b) => b - a)),
  ];


  const genresList = [
    "триллер", "фантастика", "драма", "детектив", "биография",
    "история", "военный", "боевик", "криминал", "ужасы",
    "приключения", "комедия", "вестерн", "фэнтези"
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
    filterMovies(query, selectedYear, selectedGenres);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterMovies("", year, selectedGenres);
  };

  const handleGenreChange = (event, updatedGenres) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedGenres(options);
    filterMovies("", selectedYear, options);
  };

  const filterMovies = (query, year, genres) => {
    let filtered = movies;

    if (query) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (year !== "all") {
      filtered = filtered.filter((movie) => movie.year.toString() === year);
    }

    if (genres.length > 0) {
      filtered = filtered.filter((movie) =>
        genres.every((genre) => movie.genres.includes(genre))
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <div className="w-100 p-0">

        <FiltersBar onSearch={handleSearch} onYearSelect={handleYearChange} uniqueYears={uniqueYears} onGenresSelect={handleGenreChange} genresList={genresList} />
        <div className="w-100 movies-container">
        {filteredMovies.map((movie, index) => (
            <MovieListItem key={index} {...movie} />
        ))}
        </div>
    </div>

  );
};

export default MovieList;

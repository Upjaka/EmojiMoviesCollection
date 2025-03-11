import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";
import FiltersBar from "./FiltersBar";

const API_URL = "http://127.0.0.1:8000/api/movies/";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    setSearchText(query);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      return (
        (searchText === "" || movie.title.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedYear === "all" || movie.year.toString() === selectedYear) &&
        (selectedGenres.length === 0 || selectedGenres.every((genre) => movie.genres.includes(genre)))
      );
    });

    setFilteredMovies(filtered);
  }, [movies, searchText, selectedYear, selectedGenres]);

  return (
    <div className="w-100 p-0">
      <FiltersBar
        onSearch={handleSearch}
        onYearSelect={handleYearChange}
        uniqueYears={uniqueYears}
        onGenresSelect={handleGenreChange}
        genresList={genresList}
      />
      <div className="w-100 movies-container">
        {filteredMovies.map((movie, index) => (
          <MovieListItem key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

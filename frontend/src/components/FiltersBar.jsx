import React, { useState } from "react";
import "../styles/FiltersBar.css";

const FiltersBar = ({ onSearch, onYearSelect, uniqueYears, onGenresSelect, genresList }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onYearSelect(e);
  };

  const handleGenreChange = (e) => {
    setSelectedGenres(e.target.value)
    onGenresSelect(e)
  }

  return (
    <div className="search-bar p-4 align-items-center">
      <div className="col-lg-6 justify-content-start ml-5">
        <input
          className="search-input"
          type="text"
          placeholder="Поиск по названию..."
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex col-lg-6">
        <div className="d-flex filter-wrapper col-lg-6 align-items-center justify-content-center">
          <select value={selectedYear} onChange={handleYearChange} className="year-select p-2">
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "Все годы" : year}
                </option>
              ))}
            </select>
        </div>
        <div className="d-flex filter-wrapper col-lg-6 justify-content-center">
          <div className="genre-list">
            {genresList.map((genre) => (
              <label key={genre} className="genre-item justify-content-start">
                <input
                  className="m-1"
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;

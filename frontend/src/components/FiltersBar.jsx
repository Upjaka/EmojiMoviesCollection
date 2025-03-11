import React, { useState } from "react";
import { Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import "../styles/FiltersBar.css";

const FiltersBar = ({ onSearch, onYearSelect, uniqueYears, onGenresSelect, genresList }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);  // Состояние для показа/скрытия списка жанров

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onYearSelect(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre); // Убираем жанр, если он уже был выбран
      } else {
        return [...prev, genre]; // Добавляем жанр в список выбранных
      }
    });
  };

  const handleGenreDropdownToggle = () => {
    setShowGenreDropdown((prev) => !prev); // Переключаем видимость списка жанров
  };

  // Обновляем выбранные жанры в родительском компоненте
  React.useEffect(() => {
    onGenresSelect(selectedGenres);
  }, [selectedGenres, onGenresSelect]);

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

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownGenresButton" data-bs-toggle="dropdown" aria-expanded="false">
            Выбор жанра
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownGenresButton">
            {genresList.map((genre) => (
                <li>
                  <div key={genre} className="dropdown-item">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreSelect(genre)}
                    />
                    <label className="" htmlFor={`genre-${genre}`}>
                      {genre}
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;

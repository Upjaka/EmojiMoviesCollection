import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSelectedYear, setSelectedGenres, setPage } from "../store/moviesSlice";
import "../styles/FiltersBar.css";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const { searchText, selectedYear, selectedGenres } = useSelector((state) => state.movies);

  const uniqueYears = ["all", ...Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (1990 + i).toString())];

  const genresList = [
    "триллер", "фантастика", "драма", "детектив", "биография",
    "история", "военный", "боевик", "криминал", "ужасы",
    "приключения", "комедия", "вестерн", "фэнтези"
  ];

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
    dispatch(setPage(1));
  };

  const handleYearChange = (e) => {
    dispatch(setSelectedYear(e.target.value));
    dispatch(setPage(1));
  };

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    dispatch(setSelectedGenres(updatedGenres));
    dispatch(setPage(1));
  };

  return (
    <div className="search-bar p-3 align-items-center">
      <div className="col-lg-6 justify-content-start ml-5">
        <input
          className="search-input"
          type="text"
          placeholder="Поиск по названию..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="d-flex col-lg-6">
        <div className="d-flex filter-wrapper col-lg-6 align-items-center justify-content-center">
          <select value={selectedYear} onChange={handleYearChange} className="btn btn-secondary year-select p-2">
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year === "all" ? "Все годы" : year}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <button className="btn btn-secondary btn-select-genres dropdown-toggle" type="button" id="dropdownGenresButton" data-bs-toggle="dropdown" aria-expanded="false">
            Выбор жанра
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownGenresButton">
            {genresList.map((genre) => (
              <li key={genre}>
                <div className="dropdown-item">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
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

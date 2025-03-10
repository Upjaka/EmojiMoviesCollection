import React, { useState } from "react";
import "../styles/FiltersBar.css";

const FiltersBar = ({ onSearch, onYearSelect, uniqueYears }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onYearSelect(e);
  };

  return (
    <div className="search-bar p-4">
      <div className="col-lg-6 justify-content-start ml-5">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-lg-6">
        <select value={selectedYear} onChange={handleYearChange} className="year-select">
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year === "all" ? "Все годы" : year}
              </option>
            ))}
          </select>
      </div>

    </div>
  );
};

export default FiltersBar;

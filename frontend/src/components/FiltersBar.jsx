import React, { useState } from "react";
import "../styles/FiltersBar.css";

const FiltersBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
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
        
      </div>

    </div>
  );
};

export default FiltersBar;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import MovieListItem from "./MovieListItem";
import "./MovieList.css";
import FiltersBar from "./FiltersBar";
import { fetchMovies, setFiltersFromUrl } from "../store/moviesSlice";

const MovieList = () => {
  const dispatch = useDispatch();

  const { filteredMovies} = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
        arrayFormat: "comma",
      });
      dispatch(setFiltersFromUrl(params));
      console.log(params)
    }
  }, [dispatch]);

  return (
    <div className="w-100 p-0">
      <FiltersBar />
      <div className="w-100 movies-container">
        {filteredMovies.map((movie, index) => (
          <MovieListItem key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

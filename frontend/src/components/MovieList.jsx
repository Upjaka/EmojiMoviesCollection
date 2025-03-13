import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import MovieListItem from "./MovieListItem";
import "../styles/MovieList.css";
import FiltersBar from "./FiltersBar";
import MovieModal from "./MovieModal";
import { fetchMovies } from "../store/moviesSlice";

const MovieList = () => {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
        arrayFormat: "comma",
      });
    }
  }, [dispatch]);

  return (
    <div className="w-100 p-0">
      <FiltersBar />
      <div className="w-100 movies-container">
        {Array.isArray(movies) && movies.map((movie) => (
          <MovieListItem key={movie.id} {...movie} />
        ))}
      </div>

      {/* No spinner needed now */}
      <MovieModal />
    </div>
  );
};

export default MovieList;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import MovieListItem from "./MovieListItem";
import "../styles/MovieList.css";
import FiltersBar from "./FiltersBar";
import MovieModal from "./MovieModal";
import { fetchMovies, setFiltersFromUrl, loadMoreMoviesAsync } from "../store/moviesSlice";
import { Spinner } from "react-bootstrap";

const MovieList = () => {
  const dispatch = useDispatch();

  const { filteredMovies, loadedMovies} = useSelector(
    (state) => state.movies
  );
  const observerRef = useRef(null);

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

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(loadMoreMoviesAsync());
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [dispatch, loadedMovies]);

  return (
    <div className="w-100 p-0">
      <FiltersBar />
      <div className="w-100 movies-container">
        {loadedMovies.map((movie, index) => (
          <MovieListItem key={index} {...movie} />
        ))}
      </div>

      {loadedMovies.length < filteredMovies.length && (
        <div ref={observerRef} className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <MovieModal />
    </div>
  );
};

export default MovieList;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, loadMoreMoviesAsync } from "../store/moviesSlice";
import MovieListItem from "./MovieListItem";
import FiltersBar from "./FiltersBar";
import { Spinner } from "react-bootstrap";

const MovieList = () => {
  const dispatch = useDispatch();
  const { loadedMovies, isLoading, hasMoreMovies } = useSelector((state) => state.movies);
  const observerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (!observerRef.current || !hasMoreMovies) return;

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
  }, [dispatch, hasMoreMovies]);

  return (
    <div className="w-100 p-0">
      <FiltersBar />
      <div className="movies-container">
        {loadedMovies.map((movie, index) => (
          <MovieListItem key={index} {...movie} />
        ))}
      </div>

      {hasMoreMovies && (
        <div ref={observerRef} className="d-flex justify-content-center my-4">
          {isLoading ? <Spinner animation="border" variant="primary" /> : null}
        </div>
      )}
    </div>
  );
};

export default MovieList;

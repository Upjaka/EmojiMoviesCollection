import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import MovieListItem from "./MovieListItem";
import "../styles/MovieList.css";
import FiltersBar from "./FiltersBar";
import MovieModal from "./MovieModal";
import { fetchMovies,loadMoreMoviesAsync } from "../store/moviesSlice";
import { Spinner } from "react-bootstrap";  // Import Bootstrap Spinner

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, isLoading } = useSelector((state) => state.movies);

  // Set up a reference to the last movie element to trigger lazy loading
  const observerRef = useRef(null);

  // Lazy loading logic: when we reach the last movie, fetch the next page
  useEffect(() => {
    if (observerRef.current) {
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
    }
  }, [dispatch, currentPage, totalPages, isLoading]);

  // Fetch movies when the component is mounted or the page changes
  useEffect(() => {
    dispatch(fetchMovies(currentPage)); // Pass the current page to the API call
  }, [dispatch, currentPage]);

  // Handle search query from the URL
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
        arrayFormat: "comma",
      });
      // You can dispatch an action to store search parameters if needed
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

      {/* Lazy loading spinner when fetching more movies */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Intersection observer target: last movie element */}
      <div ref={observerRef} style={{ visibility: "hidden" }}></div>

      <MovieModal />
    </div>
  );
};

export default MovieList;

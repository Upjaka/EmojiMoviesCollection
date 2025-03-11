import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";

// Асинхронный запрос для загрузки фильмов
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/movies/");
  const data = await response.json();
  return data;
});

const initialState = {
  movies: [],
  filteredMovies: [],
  searchText: "",
  selectedYear: "all",
  selectedGenres: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      moviesSlice.caseReducers.filterMovies(state);
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
      moviesSlice.caseReducers.filterMovies(state);
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
      moviesSlice.caseReducers.filterMovies(state);
    },
    filterMovies: (state) => {
      state.filteredMovies = state.movies.filter((movie) => {
        return (
          (state.searchText === "" ||
            movie.title.toLowerCase().includes(state.searchText.toLowerCase())) &&
          (state.selectedYear === "all" || movie.year.toString() === state.selectedYear) &&
          (state.selectedGenres.length === 0 ||
            state.selectedGenres.every((genre) => movie.genres.includes(genre)))
        );
      });
      moviesSlice.caseReducers.updateUrlParams(state);
    },
    setFiltersFromUrl: (state, action) => {
      state.searchText = action.payload.search || "";
      state.selectedYear = action.payload.year || "all";
      state.selectedGenres = action.payload.genres || [];
      moviesSlice.caseReducers.filterMovies(state);
    },
    updateUrlParams: (state) => {
      const queryParams = qs.stringify(
        {
          search: state.searchText || undefined,
          year: state.selectedYear !== "all" ? state.selectedYear : undefined,
          genres: state.selectedGenres.length > 0 ? state.selectedGenres : undefined,
        },
        { arrayFormat: "comma", skipNulls: true }
      );

      window.history.replaceState(null, "", `?${queryParams}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.filteredMovies = action.payload;
    });
  },
});

export const {
  setSearchText,
  setSelectedYear,
  setSelectedGenres,
  setFiltersFromUrl,
} = moviesSlice.actions;
export default moviesSlice.reducer;

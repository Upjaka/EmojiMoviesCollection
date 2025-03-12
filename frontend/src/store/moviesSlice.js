import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/movies/");
  const data = await response.json();
  return data;
});

const initialState = {
  movies: [],
  filteredMovies: [],
  loadedMovies: [],
  searchText: "",
  selectedYear: "all",
  selectedGenres: [],
  moviesPerLoad: 8,
  selectedMovie: null,
};

export const loadMoreMoviesAsync = createAsyncThunk(
  "movies/loadMoreMovies",
  async (_, { getState }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = getState().movies;
        const currentLength = state.loadedMovies.length;
        const nextMovies = state.filteredMovies.slice(currentLength, currentLength + state.moviesPerLoad);
        resolve(nextMovies);
      }, 1000);
    });
  }
);

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
    setSelectedMovie: (state, action) => {
      console.log(state.selectedMovie);
      state.selectedMovie = action.payload;
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
      state.loadedMovies = state.filteredMovies.slice(0, state.moviesPerLoad);
    },
    loadMoreMovies: (state) => {
        const currentLength = state.loadedMovies.length;
        const nextMovies = state.filteredMovies.slice(currentLength, currentLength + state.moviesPerLoad);
        state.loadedMovies = [...state.loadedMovies, ...nextMovies];
    },
    setFiltersFromUrl: (state, action) => {
        state.searchText = action.payload.search || "";
        state.selectedYear = action.payload.year || "all";
      
        state.selectedGenres = action.payload.genres
          ? Array.isArray(action.payload.genres)
            ? action.payload.genres
            : [action.payload.genres]
          : [];
      
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
      moviesSlice.caseReducers.filterMovies(state);
    });
    builder.addCase(loadMoreMoviesAsync.fulfilled, (state, action) => {
      state.loadedMovies = [...state.loadedMovies, ...action.payload];
    });
  },
});

export const {
  setSearchText,
  setSelectedYear,
  setSelectedGenres,
  setSelectedMovie,
  setFiltersFromUrl,
  loadMoreMovies
} = moviesSlice.actions;
export default moviesSlice.reducer;

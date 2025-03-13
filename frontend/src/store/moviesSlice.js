import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
import axiosInstance from "../axiosInstance";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { getState }) => {
    const state = getState().movies;
    const params = {
      search: state.searchText || "",
      page: state.currentPage,
    };

    const response = await axiosInstance.get("/movies/", { params });
    return response.data;
  }
);

export const loadMoreMoviesAsync = createAsyncThunk(
  "movies/loadMoreMovies",
  async (_, { dispatch, getState }) => {
    const state = getState().movies;
    if (!state.hasMoreMovies || state.isLoading) return; // Проверяем, есть ли ещё фильмы

    dispatch(setPage(state.currentPage + 1)); // Увеличиваем страницу
    dispatch(fetchMovies()); // Загружаем следующую страницу
  }
);

const initialState = {
  movies: [],
  loadedMovies: [],
  searchText: "",
  selectedYear: "all",
  selectedGenres: [],
  moviesPerLoad: 8,
  selectedMovie: null,
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  hasMoreMovies: true, // Флаг для lazy-loading
};


// export const loadMoreMoviesAsync = createAsyncThunk(
//   "movies/loadMoreMovies",
//   async (_, { getState }) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const state = getState().movies;
//         const currentLength = state.loadedMovies.length;
//         const nextMovies = state.filteredMovies.slice(currentLength, currentLength + state.moviesPerLoad);
//         resolve(nextMovies);
//       }, 1000);
//     });
//   }
// );

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
      state.selectedMovie = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
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
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.movies;
        state.loadedMovies = [...state.loadedMovies, ...action.payload.movies]; // Добавляем новые фильмы
        state.totalPages = action.payload.total_pages;
        state.hasMoreMovies = state.currentPage < state.totalPages; // Проверяем, есть ли ещё фильмы
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const {
  setSearchText,
  setSelectedYear,
  setSelectedGenres,
  setSelectedMovie,
  setFiltersFromUrl,
  loadMoreMovies,
  setPage,
} = moviesSlice.actions;
export default moviesSlice.reducer;

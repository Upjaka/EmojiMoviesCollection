import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import qs from "qs";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page = 1, { getState }) => {
    const state = getState().movies;

    const params = {
      search: state.searchText || undefined,
      year: state.selectedYear !== "all" ? state.selectedYear : undefined,
      genres: state.selectedGenres.length > 0 ? state.selectedGenres : undefined,
      page,
    };

    const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
    const response = await fetch(`http://127.0.0.1:8000/api/movies/?${queryString}`);
    const data = await response.json();

    // Now we handle the response format from the backend
    return {
      movies: data.movies,
      count: data.count,
      nextPage: data.next ? parseInt(new URL(data.next).searchParams.get('page')) : null,
      prevPage: data.previous ? parseInt(new URL(data.previous).searchParams.get('page')) : null,
    };
  }
);

const initialState = {
  movies: [],
  searchText: "",
  selectedYear: "all",
  selectedGenres: [],
  selectedMovie: null,
  currentPage: 1,
  totalPages: 1,  // total pages
  totalCount: 0,  // total count of items
  nextPage: null, // URL for the next page
  prevPage: null, // URL for the previous page
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateUrlParams: (state) => {
      const queryParams = qs.stringify(
        {
          search: state.searchText || undefined,
          year: state.selectedYear !== "all" ? state.selectedYear : undefined,
          genres: state.selectedGenres.length > 0 ? state.selectedGenres : undefined,
          page: state.currentPage, // Include current page in URL params
        },
        { arrayFormat: "comma", skipNulls: true }
      );
      window.history.replaceState(null, "", `?${queryParams}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.movies;
      state.totalCount = action.payload.count;
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
      state.totalPages = Math.ceil(state.totalCount / 20);  // Assume 20 items per page
    });
  },
});

export const {
  setSearchText,
  setSelectedYear,
  setSelectedGenres,
  setSelectedMovie,
  setCurrentPage,
  updateUrlParams,
} = moviesSlice.actions;

export default moviesSlice.reducer;

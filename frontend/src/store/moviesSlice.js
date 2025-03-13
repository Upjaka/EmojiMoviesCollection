import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import qs from "qs";
import { act } from "react";

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
      nextPage: data.next,
      prevPage: data.previous,
    };
  }
);

export const loadMoreMoviesAsync = createAsyncThunk(
  "movies/loadMoreMovies",
  async (_, { dispatch, getState }) => {
    const state = getState().movies;
    console.log(state);  // Для отладки
    if (state.nextPage != null) {
      // Используем state.nextPage для получения следующей страницы
      const response = await fetch(state.nextPage); 
      const data = await response.json();

      // Проверяем, есть ли данные в ответе
      if (data.movies) {
        dispatch({
          type: "movies/setMovies", // предполагается, что у вас есть action для обновления списка
          payload: {
            movies: [...state.movies, ...data.movies],  // добавляем новые фильмы к существующим
            nextPage: data.next, // обновляем nextPage для дальнейших запросов
            prevPage: data.previous, // обновляем prevPage, если нужно
          }
        });
      }
    }
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
  isLoading: false, // Loading state to show spinner
  
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.movies;
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
    },
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
    setFiltersFromUrl: (state, action) => {
      state.searchText = action.payload.search || "";
      state.selectedYear = action.payload.year || "all";
    
      state.selectedGenres = action.payload.genres
        ? Array.isArray(action.payload.genres)
          ? action.payload.genres
          : action.payload.genres.split(",") // Разбиваем строку в массив
        : [];
    
      fetchMovies();
    },    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = [...action.payload.movies];
      state.nextPage = action.payload.nextPage;
      state.totalCount = action.payload.count;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setSearchText,
  setSelectedYear,
  setSelectedGenres,
  setSelectedMovie,
  setCurrentPage,
  setLoading,
  updateUrlParams,
  setFiltersFromUrl,
} = moviesSlice.actions;

export default moviesSlice.reducer;

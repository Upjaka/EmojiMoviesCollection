import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import authReducer from "./authSlice";
import userReactionsReducer from "./userReactionsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    userReactions: userReactionsReducer,
  },
});

export default store;

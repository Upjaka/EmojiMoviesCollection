import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Асинхронное действие для загрузки реакций
export const fetchUserReactions = createAsyncThunk(
  "userReactions/fetchUserReactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/reactions/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка при загрузке реакций");
    }
  }
);

const userReactionsSlice = createSlice({
  name: "userReactions",
  initialState: {
    reactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReactions.fulfilled, (state, action) => {
        state.loading = false;
        state.reactions = action.payload;
      })
      .addCase(fetchUserReactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userReactionsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizAPI from "../services/quizAPI";

const initialState = {
  quizzesRequestStatus: "",
  quizByIdRequestStatus: "",
  quizzes: [],
  quizById: {},
};

const getAllQuizAsync = createAsyncThunk("quiz/getAllQuiz", quizAPI.getAllQuiz);
const getQuizByIdAsync = createAsyncThunk(
  "quiz/getQuizById",
  quizAPI.getQuizDetails
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  extraReducers: {
    [getAllQuizAsync.pending]: (state) => {
      state.quizzesRequestStatus = "pending";
    },
    [getAllQuizAsync.rejected]: (state, action) => {
      state.quizzesRequestStatus = "rejected";
    },
    [getAllQuizAsync.fulfilled]: (state, action) => {
      state.quizzesRequestStatus = "fulfilled";
      state.quizzes = action.payload;
    },
    [getQuizByIdAsync.pending]: (state) => {
      state.quizByIdRequestStatus = "pending";
    },
    [getQuizByIdAsync.rejected]: (state, action) => {
      state.quizByIdRequestStatus = "rejected";
    },
    [getQuizByIdAsync.fulfilled]: (state, action) => {
      state.quizByIdRequestStatus = "fulfilled";
      state.quizById = action.payload;
    },
  },
});

// export const {} = quizSlice.actions;

export { getAllQuizAsync, getQuizByIdAsync };

export default quizSlice.reducer;

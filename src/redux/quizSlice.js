import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizAPI from "../services/quizAPI";

const initialState = {
  quizzesRequestStatus: "",
  quizzes: [],
};

const getAllQuizAsync = createAsyncThunk("quiz/getAllQuiz", quizAPI.getAllQuiz);

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
  },
});

// export const {} = quizSlice.actions;

export { getAllQuizAsync };

export default quizSlice.reducer;

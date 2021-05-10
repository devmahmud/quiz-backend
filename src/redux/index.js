import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import QuizReducer from "./quizSlice";

const rootReducer = combineReducers({
  // Put reducers here
  auth: AuthReducer,
  quiz: QuizReducer,
});

export default rootReducer;

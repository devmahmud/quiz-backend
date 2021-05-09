import { combineReducers } from "@reduxjs/toolkit";
import CounterReducer from "./counterSlice";

const rootReducer = combineReducers({
  // Put reducers here
  //   auth: AuthReducer,
  counter: CounterReducer,
});

export default rootReducer;

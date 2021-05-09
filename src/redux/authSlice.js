import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authAPI from "../services/authAPI";

const initialState = {
  user: {},
  userRequestStatus: "",
  token: "",
};

const getAuthUserAsync = createAsyncThunk(
  "auth/getAuthUser",
  authAPI.getAuthUser
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      return initialState;
    },
    updateAuthUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [getAuthUserAsync.pending]: (state) => {
      state.userRequestStatus = "pending";
    },
    [getAuthUserAsync.rejected]: (state, action) => {
      state.userRequestStatus = "rejected";
    },
    [getAuthUserAsync.fulfilled]: (state, action) => {
      state.userRequestStatus = "fulfilled";
      state.user = action?.payload;
    },
  },
});

export const { login, logout, updateAuthUser } = authSlice.actions;
export { getAuthUserAsync };
export default authSlice.reducer;

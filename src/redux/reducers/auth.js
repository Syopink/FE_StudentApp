import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // thông tin user (user object)
  accessToken: null,
  refreshToken: null,
  logged: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.logged = true;
      state.error = false;
    },
    loginFail: (state) => {
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.logged = false;
      state.error = false;
    },
    updateUserInfo: (state, action) => {
      state.currentUser = action.payload;
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  logout,
  updateUserInfo,
  updateTokens,
} = authSlice.actions;

export default authSlice.reducer;

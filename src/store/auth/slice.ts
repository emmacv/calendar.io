import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../types/AuthSlice';

const initialState:
  | AuthState
  | {
      user: null;
    } = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

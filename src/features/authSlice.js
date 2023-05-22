import { createSlice } from '@reduxjs/toolkit';
import { getAuthUsername, removeCoockie } from '../utils/jwt';

const initialStateValue = { authUser: getAuthUsername() };

export const authSlice = createSlice({
  name: 'auth',
  initialState: { value: initialStateValue },
  reducers: {
    signIn: (state, action) => {
      console.log('reducer -> signin');
      state.value = action.payload;
    },

    signUp: (state, action) => {
      console.log('reducer -> signup');
      state.value = action.payload;
    },

    logout: (state) => {
      console.log('reducer -> logout');
      state.value = { authUser: null };
      removeCoockie();
    },
  },
});

export const { signIn, signUp, logout } = authSlice.actions;

export default authSlice.reducer;

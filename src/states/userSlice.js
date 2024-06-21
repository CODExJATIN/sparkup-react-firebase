import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    error: null,
    loading: false,
    accountType: null,
  },
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.accountType = action.payload.accountType; // assuming accountType is part of user data
    },
    fetchUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLogin: (state, action) => {
      state.data = action.payload;
      state.accountType = action.payload.accountType; // assuming accountType is part of user data
    },
    setLogout: (state) => {
      state.data = null;
      state.accountType = null;
      state.error = null;
      state.loading = false;
    },
    setAccountType: (state, action) => {
      if (state.data) {
        state.accountType = action.payload;
      }
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  setLogin,
  setLogout,
  setAccountType
} = userSlice.actions;

export default userSlice.reducer;

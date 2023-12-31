import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUserOrders } from './UserAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (user) => {
    const response = await fetchLoggedInUserOrders(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // different from logged in user info
        state.userOrders = action.payload;
      });
  },
});


export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (userData) => {
    const response = await checkUser(userData);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })

      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.loggedInUser = action.payload;
      })
      

  },
});


export const { increment } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;


export default authSlice.reducer;

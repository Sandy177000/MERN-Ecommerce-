import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount, addToCart, fetchItemsByUserId, updateCart, deleteItemFromCart, resetCart } from './CartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async(userId)=>{
      const response = await fetchItemsByUserId(userId);
      console.log(response.data)
      return response.data;
  }
)
export const updateCartAsync = createAsyncThunk(
  'cart/updateCartAsync',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCartAsync',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })

      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items  = action.payload;
      })


      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload)
        state.items[index]  = action.payload;
      })

      
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload)
        state.items.splice(index,1);
      })

      
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';

      });

  },
});

export const { increment } = CartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default CartSlice.reducer;

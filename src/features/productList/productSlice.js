import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById, fetchProductsByFilters } from './productAPI';

const initialState = {
  products:[],
  status: 'idle',
  totalItems:0,
  category:[],
  brands:[],
  selectedProduct: null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts(); // returns promise object
    return response.data; // returning products data from received promise object which sets the state to be used
  }
);


//fetching product by id for details page

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id); // returns promise object
    //console.log(response.data);
    return response.data; // returning products data from received promise object which sets the state to be used
  }
);




// fetching brands list
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands(); // returns promise object
    return response.data; 
  }
);

// fetching categories list
export const fetchAllCategoryAsync = createAsyncThunk(
  'product/fetchAllCategory',
  async () => {
    const response = await fetchAllCategories(); // returns promise object
    return response.data; 
  }
);


// handle product filtering
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data; 
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })

      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })

      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});
export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export const selectAllBrands =  (state) => state.product.brands;

export const selectAllCategory =  (state) => state.product.category;

export const selectTotalItems = (state) => state.product.totalItems;

export const selectedProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;

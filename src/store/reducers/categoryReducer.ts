import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Category} from '../../types/category.types';
import {getCategories} from '../../services/apis/category.api';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    const {categories} = await getCategories();

    return categories;
  },
);

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;

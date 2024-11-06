import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PopularSearch} from '../../types/constant.types';
import {getPopularSearches} from '../../services/apis/constant.api';
import {getFurnitures} from '../../services/apis/furniture.api';
import {Furniture} from '../../types/furniture.types';

export const fetchPopularSearch = createAsyncThunk(
  'search/fetchPopularSearch',
  async (_, thunkAPI) => {
    const {popularSearches} = await getPopularSearches();

    return popularSearches;
  },
);

export const fetchFurnitures = createAsyncThunk(
  'search/fetchFurnitures',
  async (
    {categoryId, search}: {categoryId?: number; search?: string},
    thunkAPI,
  ) => {
    const {furnitures} = await getFurnitures(categoryId, search);

    return furnitures;
  },
);

export interface SearchState {
  searchValue: string;
  furnitures: Furniture[];

  popularSearches: PopularSearch[];
  recentSearches: {name: string}[];
}

const initialState: SearchState = {
  searchValue: '',
  furnitures: [],

  popularSearches: [],
  recentSearches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (
      state,
      action: PayloadAction<SearchState['searchValue']>,
    ) => {
      state.searchValue = action.payload;
    },
    resetSearchValue: state => {
      state.searchValue = '';
      state.furnitures = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFurnitures.fulfilled, (state, action) => {
      state.furnitures = action.payload;
    });
    builder.addCase(fetchPopularSearch.fulfilled, (state, action) => {
      state.popularSearches = action.payload;
    });
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;

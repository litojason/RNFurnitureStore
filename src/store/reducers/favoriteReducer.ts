import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Favorite} from '../../types/favorite.types';
import {getFavorites} from '../../services/apis/favorite.api';

export const fetchFavorites = createAsyncThunk(
  'favorite/fetchFavorites',
  async (_, thunkAPI) => {
    const {favorites} = await getFavorites();

    return favorites;
  },
);

export interface FavoriteState {
  favorites: Favorite[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;

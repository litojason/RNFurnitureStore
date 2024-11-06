import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {User} from '../../types/user.types';
import {removeToken, storeToken} from '../../lib/asyncStorage';
import {getProfile} from '../../services/apis/user.api';

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, {dispatch}) => {
    dispatch(userActions.setLoading(true));
    const {user} = await getProfile();

    return user;
  },
);

// const userToken = getToken()

export interface UserState extends User {
  profileLoading: boolean;
}

const initialState: UserState = {
  id: -1,
  email: '',
  name: '',
  phoneNumber: '',
  token: '',
  profileLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      storeToken(action.payload);
    },
    logout: state => {
      state.token = '';
      removeToken();
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.profileLoading = false;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

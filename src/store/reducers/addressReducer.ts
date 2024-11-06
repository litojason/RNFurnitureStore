import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Address} from '../../types/address.types';
import {getAddressById, getAddresses} from '../../services/apis/address.api';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, thunkAPI) => {
    const {addresses} = await getAddresses();

    return addresses;
  },
);

export const fetchAddressById = createAsyncThunk(
  'address/fetchAddressById',
  async (addressId: number, thunkAPI) => {
    const {address} = await getAddressById(addressId);

    return address;
  },
);

export interface AddressState {
  addressId: number;
  addressesLoading: boolean;
  addresses: Address[];

  addressDetailsLoading: boolean;
  addressDetails?: Address;
}

const initialState: AddressState = {
  addressId: -1,
  addressesLoading: false,
  addresses: [],

  addressDetailsLoading: false,
  addressDetails: undefined,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    resetAddressForm: state => {
      state.addressDetails = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAddresses.pending, (state, action) => {
      state.addressesLoading = true;
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });

    builder.addCase(fetchAddressById.pending, (state, action) => {
      state.addressDetailsLoading = true;
    });
    builder.addCase(fetchAddressById.fulfilled, (state, action) => {
      state.addressDetails = action.payload;
      state.addressDetailsLoading = false;
    });
  },
});

export const addressActions = addressSlice.actions;

export default addressSlice.reducer;

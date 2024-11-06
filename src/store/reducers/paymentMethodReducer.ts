import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {UserPaymentMethod} from '../../types/paymentMethod.types';
import {
  getUserPaymentMethodById,
  getUserPaymentMethods,
} from '../../services/apis/paymentMethod.api';

export const fetchUserPaymentMethods = createAsyncThunk(
  'paymentMethod/fetchUserPaymentMethods',
  async thunkAPI => {
    const {paymentMethods} = await getUserPaymentMethods();

    return paymentMethods;
  },
);

export const fetchCardDetails = createAsyncThunk(
  'paymentMethod/fetchCardDetails',
  async (userPaymentMethodId: number, thunkAPI) => {
    const {paymentMethod} = await getUserPaymentMethodById(userPaymentMethodId);

    return paymentMethod;
  },
);

export interface PaymentMethodState {
  paymentMethodsLoading: boolean;
  paymentMethods: UserPaymentMethod[];

  cardDetailsLoading: boolean;
  cardDetails?: UserPaymentMethod;
}

const initialState: PaymentMethodState = {
  paymentMethodsLoading: false,
  paymentMethods: [],

  cardDetailsLoading: false,
  cardDetails: undefined,
};

const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    resetCardPaymentForm: state => {
      state.cardDetails = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPaymentMethods.pending, (state, action) => {
      state.paymentMethodsLoading = true;
    });
    builder.addCase(fetchUserPaymentMethods.fulfilled, (state, action) => {
      state.paymentMethods = action.payload;
      state.paymentMethodsLoading = false;
    });

    builder.addCase(fetchCardDetails.pending, (state, action) => {
      state.cardDetailsLoading = true;
    });
    builder.addCase(fetchCardDetails.fulfilled, (state, action) => {
      state.cardDetails = action.payload;
      state.cardDetailsLoading = false;
    });
  },
});

export const paymentMethodActions = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;

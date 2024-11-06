import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Order} from '../../types/order.types';
import {getOrderById, getOrders} from '../../services/apis/order.api';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, thunkAPI) => {
    const {orders} = await getOrders();

    return orders;
  },
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId: number, thunkAPI) => {
    const {order} = await getOrderById(orderId);

    return order;
  },
);

export interface OrderState {
  orders: Order[];
  orderDetails?: Order;
}

const initialState: OrderState = {
  orders: [],
  orderDetails: undefined,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
    });
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;

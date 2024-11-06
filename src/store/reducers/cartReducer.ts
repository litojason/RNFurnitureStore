import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {
  deleteCartItem,
  getCartItems,
  postCartItem,
  PostCartItemBody,
} from '../../services/apis/cart.api';
import {CartItem} from '../../types/cart.types';
import {store} from '../store';
import {Alert} from 'react-native';
import {Address} from '../../types/address.types';
import {UserPaymentMethod} from '../../types/paymentMethod.types';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI) => {
    const {cartId, cartItems, totalItemsPrice, deliveryCharge, totalPrice} =
      await getCartItems();

    return {cartId, cartItems, totalItemsPrice, deliveryCharge, totalPrice};
  },
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (data: PostCartItemBody, thunkAPI) => {
    const {cartItem} = await postCartItem(data);

    return cartItem;
  },
);

export const deleteItemInCart = createAsyncThunk(
  'cart/deleteItemInCart',
  async ({id, cartId}: {id: number; cartId: number}, thunkAPI) => {
    await deleteCartItem(id, cartId);
    return id;
  },
);

export interface CartState {
  cartId: number;
  cartItems: CartItem[];
  totalItemsPrice: number;
  deliveryCharge: number;
  totalPrice: number;

  shippingDetails?: Address;
  paymentDetails?: UserPaymentMethod;
}

const initialState: CartState = {
  cartId: -1,
  cartItems: [],
  totalItemsPrice: 0,
  deliveryCharge: 0,
  totalPrice: 0,

  shippingDetails: undefined,
  paymentDetails: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShippingDetails: (
      state,
      action: PayloadAction<CartState['shippingDetails']>,
    ) => {
      state.shippingDetails = action.payload;
    },
    setPaymentDetails: (
      state,
      action: PayloadAction<CartState['paymentDetails']>,
    ) => {
      state.paymentDetails = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      const {cartId, cartItems, totalItemsPrice, deliveryCharge, totalPrice} =
        action.payload;

      state.cartId = cartId;
      state.cartItems = cartItems;
      state.totalItemsPrice = totalItemsPrice;
      state.deliveryCharge = deliveryCharge;
      state.totalPrice = totalPrice;
    });

    builder.addCase(deleteItemInCart.rejected, (state, action) => {
      Alert.alert('Failed to delete cart item');
    });
    builder.addCase(deleteItemInCart.fulfilled, (state, action) => {
      const cartItemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload,
      );

      state.cartItems.splice(cartItemIndex, 1);
    });
  },
});

export const cartActions = cartSlice.actions;

export const handleAddToCart =
  (failedCallback?: () => void, successCallback?: () => void) =>
  async (dispatch: typeof store.dispatch) => {
    const {selectedColor, selectedSize, selectedFurnitureOptionId} =
      store.getState().furniture;

    if (selectedColor && selectedSize) {
      dispatch(
        updateCart({
          furnitureOptionId: selectedFurnitureOptionId!,
          quantity: 1,
        }),
      ).then(() => dispatch(fetchCartItems()));

      if (successCallback) successCallback();

      return;
    }

    if (failedCallback) failedCallback();
  };

export default cartSlice.reducer;

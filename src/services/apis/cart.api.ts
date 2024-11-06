import client, {handleClientError} from '../client';
import {CartItem} from '../../types/cart.types';

type GetCartItemsResponse = {
  message: string;
  cartId: number;
  cartItems: CartItem[];
  totalItemsPrice: number;
  deliveryCharge: number;
  totalPrice: number;
};
export const getCartItems = async () => {
  try {
    const response = await client.get('/carts');

    return response.data as GetCartItemsResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

export type PostCartItemBody = {
  furnitureOptionId: number;
  quantity: number;
};
type PostCartItemResponse = {
  message: string;
  cartItem: CartItem;
};
export const postCartItem = async (body: PostCartItemBody) => {
  try {
    const response = await client.post('/carts', body);

    return response.data as PostCartItemResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type DeleteCartItemResponse = {
  message: string;
};
export const deleteCartItem = async (id: number, cartId: number) => {
  try {
    const response = await client.delete(`/carts/${cartId}/cart-item/${id}`);

    return response.data as DeleteCartItemResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

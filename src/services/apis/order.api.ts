import client, {handleClientError} from '../client';
import {Order, OrderCreation} from '../../types/order.types';

type GetOrdersResponse = {
  message: string;
  orders: Order[];
};
export const getOrders = async () => {
  try {
    const response = await client.get('/orders');

    return response.data as GetOrdersResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetOrderByIdResponse = {
  message: string;
  order: Order;
};
export const getOrderById = async (orderId: number) => {
  try {
    const response = await client.get(`/orders/${orderId}`);

    return response.data as GetOrderByIdResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type PostOrderResponse = {
  message: string;
  order: Order;
};
export const postOrder = async (body: OrderCreation) => {
  try {
    const response = await client.post('/orders', body);

    return response.data as PostOrderResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

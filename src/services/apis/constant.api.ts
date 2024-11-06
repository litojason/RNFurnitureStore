import client, {handleClientError} from '../client';
import {OrderStatus, PopularSearch} from '../../types/constant.types';

type GetPopularSearchesResponse = {
  message: string;
  popularSearches: PopularSearch[];
};
export const getPopularSearches = async () => {
  try {
    const response = await client.get(`/constants/popular-searches`);

    return response.data as GetPopularSearchesResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetOrderStatusesResponse = {
  message: string;
  orderStatuses: OrderStatus[];
};
export const getOrderStatuses = async () => {
  try {
    const response = await client.get(`/constants/order-statuses`);

    return response.data as GetOrderStatusesResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

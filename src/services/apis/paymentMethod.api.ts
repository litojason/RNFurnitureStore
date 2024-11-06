import client, {handleClientError} from '../client';
import {
  UserPaymentMethod,
  UserPaymentMethodCreation,
} from '../../types/paymentMethod.types';

type GetUserPaymentMethodsResponse = {
  message: string;
  paymentMethods: UserPaymentMethod[];
};
export const getUserPaymentMethods = async () => {
  try {
    const response = await client.get('/payment-methods');

    return response.data as GetUserPaymentMethodsResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetUserPaymentMethodByIdResponse = {
  message: string;
  paymentMethod: UserPaymentMethod;
};
export const getUserPaymentMethodById = async (userPaymentMethodId: number) => {
  try {
    const response = await client.get(
      `/payment-methods/${userPaymentMethodId}`,
    );

    return response.data as GetUserPaymentMethodByIdResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type PostCardPaymentMethodResponse = {
  message: string;
  paymentMethod: UserPaymentMethod;
};
export const postUserPaymentMethod = async (
  body: UserPaymentMethodCreation,
) => {
  try {
    const response = await client.post('/payment-methods', body);

    return response.data as PostCardPaymentMethodResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type UpdateCardPaymentMethodResponse = {
  message: string;
  paymentMethod: UserPaymentMethod;
};
export const updateUserPaymentMethod = async (
  userPaymentMethodId: number,
  body: UserPaymentMethodCreation,
) => {
  try {
    const response = await client.put(
      `/payment-methods/${userPaymentMethodId}`,
      body,
    );

    return response.data as UpdateCardPaymentMethodResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type DeleteCardPaymentMethodResponse = {
  message: string;
};
export const deleteUserPaymentMethod = async (userPaymentMethodId: number) => {
  try {
    const response = await client.delete(
      `/payment-methods/${userPaymentMethodId}`,
    );

    return response.data as DeleteCardPaymentMethodResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

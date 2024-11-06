import client, {handleClientError} from '../client';
import {Address, AddressCreation} from '../../types/address.types';

type GetAddressesResponse = {
  message: string;
  addresses: Address[];
};
export const getAddresses = async () => {
  try {
    const response = await client.get('/addresses');

    return response.data as GetAddressesResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetAddressByIdResponse = {
  message: string;
  address: Address;
};
export const getAddressById = async (addressId: number) => {
  try {
    const response = await client.get(`/addresses/${addressId}`);

    return response.data as GetAddressByIdResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type PostAddressResponse = {
  message: string;
  address: Address;
};
export const postAddress = async (body: AddressCreation) => {
  try {
    const response = await client.post('/addresses', body);

    return response.data as PostAddressResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type UpdateAddressResponse = {
  message: string;
  address: Address;
};
export const updateAddress = async (
  addressId: number,
  body: AddressCreation,
) => {
  try {
    const response = await client.put(`/addresses/${addressId}`, body);

    return response.data as UpdateAddressResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type DeleteAddressResponse = {
  message: string;
};
export const deleteAddress = async (addressId: number) => {
  try {
    const response = await client.delete(`/addresses/${addressId}`);

    return response.data as DeleteAddressResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

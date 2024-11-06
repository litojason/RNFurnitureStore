import client, {handleClientError} from '../client';
import {Furniture} from '../../types/furniture.types';

type GetFurnituresResponse = {
  message: string;
  furnitures: Furniture[];
};
export const getFurnitures = async (categoryId?: number, search?: string) => {
  try {
    let path = '/furnitures';
    if (categoryId && search) {
      path += `?categoryId=${categoryId}&search=${search}`;
    } else if (categoryId) {
      path += `?categoryId=${categoryId}`;
    } else if (search) {
      path += `?search=${search}`;
    }

    const response = await client.get(path);

    return response.data as GetFurnituresResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetFurnitureDetails = {
  message: string;
  furniture: Furniture;
};
export const getFurnitureDetails = async (furnitureId: number) => {
  try {
    const response = await client.get(`/furnitures/${furnitureId}`);
    console.log('getFurnitureDetails', response.data);

    return response.data as GetFurnitureDetails;
  } catch (error) {
    return handleClientError(error);
  }
};

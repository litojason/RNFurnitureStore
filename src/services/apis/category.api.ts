import client, {handleClientError} from '../client';
import {Category} from '../../types/category.types';

type GetCategoriesResponse = {
  message: string;
  categories: Category[];
};
export const getCategories = async () => {
  try {
    const response = await client.get('/categories');

    return response.data as GetCategoriesResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

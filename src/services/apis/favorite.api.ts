import client, {handleClientError} from '../client';
import {Favorite} from '../../types/favorite.types';

type GetFavoritesResponse = {
  message: string;
  favorites: Favorite[];
};
export const getFavorites = async () => {
  try {
    const response = await client.get('/favorites');

    return response.data as GetFavoritesResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

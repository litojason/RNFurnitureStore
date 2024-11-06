import {Furniture} from './furniture.types';

export type Favorite = {
  id: number;
  userId: number;
  furnitureId: number;
  furniture: Furniture;
};

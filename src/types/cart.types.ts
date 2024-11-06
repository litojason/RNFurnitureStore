import {FurnitureOption} from './furniture.types';

export type CartItem = {
  id: number;
  quantity: number;
  cartId: number;
  furnitureOptionId: number;
  furnitureOption: FurnitureOption;
};

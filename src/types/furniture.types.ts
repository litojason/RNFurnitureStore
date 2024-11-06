import {Category} from './category.types';

export type ColorAttribute = {
  name: string;
  value: string;
  code: string;
};

export type SizeAttribute = {
  name: string;
  value: string;
  code: string;
};

export type Discount = {
  name: string;
  description: string;
  percentage: number;
  isDefault: boolean;
};

export type OptionType = 'color' | 'size';

export type FurnitureOption = {
  id: number;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  furnitureId: number;
  furniture: Furniture;
  colorAttributeId: number;
  colorAttribute: ColorAttribute;
  sizeAttributeId: number;
  sizeAttribute: SizeAttribute;
};

export type Furniture = {
  id: number;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  category: Category;
  discountId: number;
  discount: Discount;
  furnitureOptions: FurnitureOption[];
};

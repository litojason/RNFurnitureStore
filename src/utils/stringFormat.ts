import {FurnitureOption} from '../types/furniture.types';

export const maskCardNumber = (cardNumber: string) => {
  return `**** **** ${cardNumber.substring(cardNumber.length - 4)}`;
};
export const currencyFormat = (value: number) => {
  return `$${value}`;
};
export const furnitureOptionsString = (furnitureOption: FurnitureOption) => {
  const colorName = furnitureOption.colorAttribute.name;
  const sizeName = furnitureOption.sizeAttribute.name;
  return `${colorName}, ${sizeName}`;
};

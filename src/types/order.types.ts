import {OrderStatus, PaymentMethod} from './constant.types';
import {Address} from './address.types';
import {FurnitureOption} from './furniture.types';

export enum OrderStatuses {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export type OrderItem = {
  id: number;
  orderId: number;
  quantity: number;
  price: number;
  furnitureOption: FurnitureOption;
};

export type Order = {
  id: number;
  totalItemsPrice: number;
  deliveryCharge: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  orderItems: OrderItem[];
  orderAddress: Address;
  createdAt: Date;
};

export type OrderCreation = {
  addressId: number;
  paymentMethodId: number;
};

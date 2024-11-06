import {OrderStatuses} from './order.types';

export type PaymentMethod = {
  id: number;
  name: string;
  value: string;
};

export type OrderStatus = {
  id: number;
  name: string;
  value:
    | OrderStatuses.PENDING
    | OrderStatuses.SHIPPED
    | OrderStatuses.COMPLETED
    | OrderStatuses.COMPLETED;
};

export type PopularSearch = {
  id: number;
  name: string;
};

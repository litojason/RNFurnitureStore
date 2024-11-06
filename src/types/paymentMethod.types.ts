import {PaymentMethod} from './constant.types';

export type UserPaymentMethod = {
  id: number;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  isDefault: boolean;
  paymentMethodId: PaymentMethod['id'];
};

export type UserPaymentMethodCreation = Omit<
  UserPaymentMethod,
  'id' | 'isDefault' | 'paymentMethodId'
>;

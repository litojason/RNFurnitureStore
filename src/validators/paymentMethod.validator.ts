import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const cardPaymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .length(12, 'Card number must be 12 numbers long.')
    .required('Card number is required.')
    .label('Card number'),
  expirationDate: yup
    .string()
    .required('Expiration date is required.')
    .label('Expiration date'),
  cvc: yup
    .string()
    .length(3, 'CVC is 3 numbers long.')
    .required('CVC is required.')
    .label('CVC'),
});
export const cardPaymentResolver = yupResolver(cardPaymentSchema);

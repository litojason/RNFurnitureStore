import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const editAddressSchema = yup.object().shape({
  name: yup.string().min(2).trim().required('Name is required.').label('Name'),
  address: yup
    .string()
    .trim()
    .required('Address is required.')
    .label('Address'),
  province: yup
    .string()
    .trim()
    .required('Province is required.')
    .label('Province'),
  city: yup.string().trim().required('City is required.').label('City'),
  postalCode: yup
    .string()
    .trim()
    .required('Postal code is required.')
    .label('Postal code'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Phone number is required.')
    .label('Phone number'),
});
export const editAddressResolver = yupResolver(editAddressSchema);

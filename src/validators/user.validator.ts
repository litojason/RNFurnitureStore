import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email.')
    .required('Email is required.')
    .label('Email'),
  password: yup.string().required('Password is required.').label('Password'),
});
export const loginResolver = yupResolver(loginSchema);

const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be minimum 2 characters long.')
    .required('Name is required.')
    .label('Name'),
  phoneNumber: yup
    .string()
    .required('Phone number is required.')
    .label('Phone number'),
});
export const editProfileResolver = yupResolver(editProfileSchema);

const registerSchema = editProfileSchema.shape({
  email: yup
    .string()
    .email('Invalid email.')
    .required('Email is required.')
    .label('Email'),
  password: yup
    .string()
    .min(6, 'Password must be minimum 6 characters long.')
    .required('Password is required.')
    .label('Password'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Password must match.'),
});
export const registerResolver = yupResolver(registerSchema);

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required.')
    .label('Current password'),
  newPassword: yup
    .string()
    .min(6, 'Password must be minimum 6 characters long.')
    .required('New password is required.')
    .label('New password'),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password.')
    .oneOf([yup.ref('newPassword')], 'Password must match.'),
});
export const changePasswordResolver = yupResolver(changePasswordSchema);

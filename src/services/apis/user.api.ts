import client, {handleClientError} from '../client';
import {
  ChangePasswordData,
  EditProfileData,
  LoginData,
  User,
  UserCreation,
} from '../../types/user.types';

type LoginResponse = {
  message: string;
  user: User;
};
export const login = async (data: LoginData) => {
  try {
    const response = await client.post('/users/login', data);

    return response.data as LoginResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type RegisterResponse = {
  message: string;
  user: User;
};
export const register = async (data: UserCreation) => {
  try {
    const response = await client.post('/users/register', data);

    return response.data as RegisterResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type GetProfileResponse = {
  message: string;
  user: User;
};
export const getProfile = async () => {
  try {
    const response = await client.get('/users/profile');

    return response.data as GetProfileResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type EditProfileResponse = {
  message: string;
  user: User;
};
export const editProfile = async (data: EditProfileData) => {
  try {
    const response = await client.put('/users/profile', data);

    return response.data as EditProfileResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

type ChangePasswordResponse = {
  message: string;
};
export const changePassword = async (data: ChangePasswordData) => {
  try {
    const response = await client.put('/users/profile/password', data);

    return response.data as ChangePasswordResponse;
  } catch (error) {
    return handleClientError(error);
  }
};

import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';

import {getToken} from '../lib/asyncStorage';

const Config = {
  API_URL: 'YOUR_OWN_API_URL',
};

const client = axios.create({
  baseURL: `${Config.API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export const handleClientError = (error: unknown) => {
  const e = error as Error | AxiosError;
  console.log('e', e);

  if (axios.isAxiosError(e)) {
    // Handle Axios-specific errors
    const message = e.response?.data?.message || '';
    const errors = e.response?.data?.errors || undefined;
    __DEV__ && console.log('Axios error message:', message);
    __DEV__ && console.log('Axios errors:', errors);
    throw {message, errors};
  } else {
    // Handle General errors
    const message = e?.message || '';
    __DEV__ && console.error('General error:', message);
    throw {message};
  }
};

export default client;

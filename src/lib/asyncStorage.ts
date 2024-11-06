import AsyncStorage from '@react-native-async-storage/async-storage';

// import {ThemeType} from '../store/AppProvider';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('storeToken error', error);
    return error;
  }
};
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    // console.log('token', token);
    return token !== null ? token : '';
  } catch (error) {
    console.log('getToken error', error);
    return '';
  }
};
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('removeToken error', error);
    return error;
  }
};

// export const storeTheme = async (theme: ThemeType) => {
//   try {
//     await AsyncStorage.setItem('theme', theme);
//   } catch (error) {
//     console.log('storeTheme error', error);
//     return error;
//   }
// };
// export const getTheme = async (): Promise<ThemeType> => {
//   try {
//     const theme = await AsyncStorage.getItem('theme');

//     return theme !== null ? (theme as ThemeType) : 'system';
//   } catch (error) {
//     console.log('getToken error', error);
//     return 'system';
//   }
// };

import {DefaultTheme, DarkTheme, ExtendedTheme} from '@react-navigation/native';

export const lightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#316A42',
    primaryContainer: '#B3F1BE',
    secondaryContainer: '#D2E8D3',
    background: '#F6FBF3',
    surface: '#EBEFE7',
    text: '#181D18',
    placeholder: '#717971',
    outline: '#717971',
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    modalOverlay: 'rgba(0, 0, 0, 0.2)',

    white: '#FFFFFF',
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#316A42',
    primaryContainer: '#B3F1BE',
    secondaryContainer: '#D2E8D3',
    background: '#F6FBF3',
    surface: '#EBEFE7',
    text: '#181D18',
    placeholder: '#717971',
    outline: '#717971',
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    modalOverlay: 'rgba(0, 0, 0, 0.2)',

    white: '#FFFFFF',
  },
};

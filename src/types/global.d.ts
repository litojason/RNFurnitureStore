import '@react-navigation/native';
import {Theme} from '@react-navigation/native';

// Override the theme in react native navigation to accept our custom theme props.
declare module '@react-navigation/native' {
  export interface ExtendedTheme extends Theme {
    dark: boolean;
    colors: Theme['colors'] & {
      primaryContainer: string;
      secondaryContainer: string;
      surface: string;
      placeholder: string;
      outline: string;
      error: string;
      errorContainer: string;
      modalOverlay: string;

      white: string;
    };
  }
  export function useTheme(): ExtendedTheme;
}

import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {LoginNavProp} from '../../types/navigation.types';
import {assets, dimensions} from '../../utils';
import {Button, LoginForm, Screen, Text} from '../../components';

const LoginScreen = ({navigation}: LoginNavProp) => {
  const {colors} = useTheme();

  return (
    <Screen
      isSafeArea
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        padding: 16,
        gap: 16,
      }}>
      <Text variant="h1">Welcome!</Text>

      <LoginForm />

      <Text>
        Don't have an account?{' '}
        <Text
          weight="semibold"
          onPress={() => navigation.replace('Register')}
          style={{color: colors.primary}}>
          Register
        </Text>
      </Text>
    </Screen>
  );
};

export default LoginScreen;

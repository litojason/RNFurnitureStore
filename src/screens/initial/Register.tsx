import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {RegisterNavProp} from '../../types/navigation.types';
import {RegisterForm, Screen, Text} from '../../components';

const RegisterScreen = ({navigation}: RegisterNavProp) => {
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
      <Text variant="h1">Create New Account</Text>

      <RegisterForm navigation={navigation} />

      <Text>
        Already have an account?{' '}
        <Text
          weight="semibold"
          onPress={() => navigation.replace('Login')}
          style={{color: colors.primary}}>
          Login
        </Text>
      </Text>
    </Screen>
  );
};

export default RegisterScreen;

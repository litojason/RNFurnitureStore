import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {useForm} from 'react-hook-form';

import {LoginData} from '../../types/user.types';
import {Input} from '../input';
import {Button} from '../button';
import {loginResolver} from '../../validators/user.validator';
import {login} from '../../services/apis/user.api';
import {useAppDispatch} from '../../hooks/storeHooks';
import {fetchProfile, userActions} from '../../store/reducers/userReducer';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {control, handleSubmit, setError} = useForm<LoginData>({
    mode: 'onChange',
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: LoginData) => {
    // setIsLoading(true);

    login(data)
      .then(responseData => {
        dispatch(userActions.setToken(responseData.user.token));
        dispatch(fetchProfile());
      })
      .catch(e => {
        Alert.alert('Login Failed', e.message);
        setError('email', {
          message: e.message,
        });
      });
    // .finally(() => setIsLoading(false));
  };

  return (
    <View style={{width: '100%', gap: 16}}>
      <Input
        control={control}
        name="email"
        label="Email"
        leftIconName="email-outline"
        placeholder="eg. test@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        control={control}
        name="password"
        label="Password"
        leftIconName="lock-outline"
        placeholder="eg. pass1234"
        secureTextEntry
      />

      <Button
        // isLoading={isLoading}
        text="Login"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{marginTop: 16}}
      />
    </View>
  );
};

export default LoginForm;

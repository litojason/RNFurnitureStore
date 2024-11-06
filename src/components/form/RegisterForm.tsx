import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {useForm} from 'react-hook-form';

import {RegisterNavProp} from '../../types/navigation.types';
import {UserCreation} from '../../types/user.types';
import {Input} from '../input';
import {Button} from '../button';
import {ModalAlert} from '../modal';
import {registerResolver} from '../../validators/user.validator';
import {register} from '../../services/apis/user.api';

type RegisterFormProps = {
  navigation: RegisterNavProp['navigation'];
};

const RegisterForm = ({navigation}: RegisterFormProps) => {
  const {control, handleSubmit, setError} = useForm<UserCreation>({
    mode: 'onChange',
    resolver: registerResolver,
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  // const [isLoading, setIsLoading] = useState(false);
  const [registerSuccessVisible, setRegisterSuccessVisible] = useState(false);

  const onSubmit = (data: UserCreation) => {
    // setIsLoading(true);

    register(data)
      .then(responseData => {
        setRegisterSuccessVisible(true);
      })
      .catch(e => {
        Alert.alert('Register Failed', e.message);
      });

    // .finally(() => setIsLoading(false));
  };

  return (
    <>
      <ModalAlert
        cancelable={false}
        visible={registerSuccessVisible}
        setVisible={setRegisterSuccessVisible}
        title="Register Successful"
        description="Your account has been created, please login to start using our app."
        buttons={[
          {
            text: 'OK',
            onPress: navigation.goBack,
          },
        ]}
      />

      <View style={{gap: 16}}>
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
          name="name"
          label="Name"
          leftIconName="account-outline"
          placeholder="eg. John Doe"
          autoCapitalize="words"
          hint="* Minimum 2 characters"
        />

        <Input
          control={control}
          name="phoneNumber"
          label="Phone Number"
          leftIconName="phone-outline"
          placeholder="eg. 081212341234"
          keyboardType="phone-pad"
        />

        <Input
          control={control}
          name="password"
          label="Password"
          leftIconName="lock-outline"
          placeholder="eg. pass1234"
          secureTextEntry
          hint="* Password must be minimum 6 characters long."
        />

        <Input
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          leftIconName="lock-outline"
          placeholder="eg. pass1234"
          secureTextEntry
        />

        <Button
          // isLoading={isLoading}
          text="Register"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={{marginTop: 16}}
        />
      </View>
    </>
  );
};

export default RegisterForm;

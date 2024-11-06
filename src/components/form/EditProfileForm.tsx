import {View, Alert} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {EditProfileNavProp} from '../../types/navigation.types';
import {EditProfileData} from '../../types/user.types';
import {Input} from '../input';
import {Button} from '../button';
import {ModalAlert} from '../modal';
import {editProfileResolver} from '../../validators/user.validator';
import {editProfile} from '../../services/apis/user.api';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchProfile} from '../../store/reducers/userReducer';

type EditProfileFormProps = {
  navigation: EditProfileNavProp['navigation'];
};

const EditProfileForm = ({navigation}: EditProfileFormProps) => {
  const {name, phoneNumber} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const {control, handleSubmit, setError} = useForm<EditProfileData>({
    mode: 'onChange',
    resolver: editProfileResolver,
    defaultValues: {
      name: name || '',
      phoneNumber: phoneNumber || '',
    },
  });

  const [editProfileSuccessVisible, setEditProfileSuccessVisible] =
    useState(false);

  const onSubmit = (data: EditProfileData) => {
    // setIsLoading(true);

    editProfile(data)
      .then(responseData => setEditProfileSuccessVisible(true))
      .catch(e => {
        Alert.alert('Edit Profile Failed', e.message);
      });
    // .finally(() => setIsLoading(false));
  };

  return (
    <>
      <ModalAlert
        visible={editProfileSuccessVisible}
        setVisible={setEditProfileSuccessVisible}
        title="Edit Profile Success"
        description="Your profile has been updated."
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
              dispatch(fetchProfile());
            },
          },
        ]}
      />

      <View style={{flex: 1, justifyContent: 'space-between', gap: 16}}>
        <View style={{gap: 16}}>
          <Input
            control={control}
            name="name"
            label="Name"
            leftIconName="account-outline"
            placeholder="eg. John Doe"
            hint="* Minimum 2 characters"
            autoCapitalize="words"
          />

          <Input
            control={control}
            name="phoneNumber"
            label="Phone number"
            leftIconName="phone-outline"
            placeholder="eg. 081212341234"
            keyboardType="phone-pad"
          />
        </View>

        <Button
          text="Edit"
          leftIconName="square-edit-outline"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default EditProfileForm;

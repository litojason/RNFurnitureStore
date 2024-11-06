import React, {useEffect} from 'react';
import {View} from 'react-native';

import {EditProfileNavProp} from '../../../types/navigation.types';
import {EditProfileForm, Header, Screen} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {fetchProfile} from '../../../store/reducers/userReducer';

const EditProfileScreen = ({navigation}: EditProfileNavProp) => {
  const {profileLoading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <Screen isSafeArea>
      <Header title="Edit Profile" canGoBack navigation={navigation} />
      <View style={{flex: 1, padding: 16, paddingTop: 0}}>
        {!profileLoading && <EditProfileForm navigation={navigation} />}
      </View>
    </Screen>
  );
};

export default EditProfileScreen;

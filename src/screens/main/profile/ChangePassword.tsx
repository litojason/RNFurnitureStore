import React from 'react';
import {View} from 'react-native';

import {ChangePasswordNavProp} from '../../../types/navigation.types';
import {ChangePasswordForm, Header, Screen} from '../../../components';

const ChangePasswordScreen = ({navigation}: ChangePasswordNavProp) => {
  return (
    <Screen isSafeArea>
      <Header title="Change Password" canGoBack navigation={navigation} />

      <View style={{flex: 1, padding: 16, paddingTop: 0}}>
        <ChangePasswordForm navigation={navigation} />
      </View>
    </Screen>
  );
};

export default ChangePasswordScreen;

import React from 'react';
import {View} from 'react-native';

import {NotificationsNavProp} from '../../types/navigation.types';
import {Header, Screen} from '../../components';

const NotificationsScreen = ({navigation}: NotificationsNavProp) => {
  return (
    <Screen isSafeArea>
      <Header title="Notifications" canGoBack navigation={navigation} />
    </Screen>
  );
};

export default NotificationsScreen;

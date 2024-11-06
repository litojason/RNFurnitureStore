import React from 'react';
import {View} from 'react-native';

import {ChangeThemeNavProp} from '../../../types/navigation.types';
import {Header, RadioButton, Screen, Text} from '../../../components';

const ChangeThemeScreen = ({navigation}: ChangeThemeNavProp) => {
  return (
    <Screen isSafeArea>
      <Header title="Change Theme" canGoBack navigation={navigation} />

      <View style={{padding: 16, paddingTop: 0, gap: 16}}>
        <Text variant="h3">App theme settings</Text>

        <RadioButton
          text="System Preference"
          // selected={theme === 'system'}
          // onPress={() => setTheme('system')}
        />
        <RadioButton
          text="Light Theme"
          // selected={theme === 'light'}
          // onPress={() => setTheme('light')}
        />
        <RadioButton
          text="Dark Theme"
          // selected={theme === 'dark'}
          // onPress={() => setTheme('dark')}
        />
      </View>
    </Screen>
  );
};

export default ChangeThemeScreen;

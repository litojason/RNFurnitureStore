import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

import {Icon} from '../icon';
import {Text} from '../text';
import {MainStackParamList, ProfileNavProp} from '../../types/navigation.types';

export type ProfileMenuProps = {
  data: {
    name: string;
    iconName: string;
    navigateTo: keyof MainStackParamList;
  };
  // navigation: ProfileNavProp['navigation'];
  navigation: any;
};
const ProfileMenuCard = ({data, navigation}: ProfileMenuProps) => {
  const {colors} = useTheme();

  const {name, iconName, navigateTo} = data;

  const handleOnPress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          gap: 8,
          backgroundColor: colors.surface,
          borderRadius: 8,
        },
      ]}>
      <Icon name={iconName} />
      <Text style={{flex: 1}}>{name}</Text>
      <Icon name="chevron-right" />
    </Pressable>
  );
};

export default ProfileMenuCard;

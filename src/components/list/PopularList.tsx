import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {HomeNavProp} from '../../types/navigation.types';
import {Text} from '../text';

type PopularListProps = {
  navigation: HomeNavProp['navigation'];
};

const PopularList = ({navigation}: PopularListProps) => {
  const {colors} = useTheme();

  return (
    <View style={{gap: 4}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text variant="h3">Popular</Text>
        <Text
          variant="label"
          onPress={() => navigation.navigate('Categories')}
          style={{color: colors.primary, textDecorationLine: 'underline'}}>
          See All
        </Text>
      </View>

      <View style={{flexDirection: 'row', gap: 16}}></View>
    </View>
  );
};

export default PopularList;

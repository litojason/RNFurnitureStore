import React from 'react';
import {Image, View} from 'react-native';

import {HomeNavProp} from '../../types/navigation.types';
import {assets} from '../../utils';
import {IconButton} from '../icon';
import CartIconButton from '../icon/CartIconButton';

type HomeHeaderProps = {
  navigation: HomeNavProp['navigation'];
};

const HomeHeader = ({navigation}: HomeHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 72,
        padding: 16,
      }}>
      <Image
        source={assets.logo.logoHorizontal}
        style={{
          width: undefined,
          height: 40,
          aspectRatio: 836 / 288,
        }}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CartIconButton navigation={navigation} />
        <IconButton
          mode="text"
          name="bell-outline"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

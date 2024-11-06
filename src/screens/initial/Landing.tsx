import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {LandingNavProp} from '../../types/navigation.types';
import {assets, dimensions} from '../../utils';
import {Button, Screen, Text} from '../../components';

const LandingScreen = ({navigation}: LandingNavProp) => {
  const {colors} = useTheme();

  return (
    <Screen isSafeArea>
      <View style={{flex: 1}}>
        <Image
          source={assets.image.landing}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
          }}
        />
      </View>

      <View
        style={{
          width: '100%',
          minHeight: dimensions.screenHeight * (3 / 8),
          padding: 16,
          backgroundColor: colors.background,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            gap: 4,
          }}>
          <Text variant="h1" style={{textAlign: 'center'}}>
            Shop Smarter, Live Better
          </Text>
          <Text style={{textAlign: 'center'}}>
            All home furniture you need is in one place, with best quality.
          </Text>
        </View>

        <View style={{gap: 16}}>
          <Button text="Login" onPress={() => navigation.navigate('Login')} />
          <Button
            mode="outlined"
            text="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </Screen>
  );
};

export default LandingScreen;

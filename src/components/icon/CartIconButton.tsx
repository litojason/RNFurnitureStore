import React from 'react';
import {Pressable, View} from 'react-native';
import {NavigationProp, useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {useAppSelector} from '../../hooks/storeHooks';
import Icon from './Icon';

type CartIconButtonProps = {
  navigation?: NavigationProp<any, any>;
};

const CartIconButton = ({navigation}: CartIconButtonProps) => {
  const {colors} = useTheme();

  const {cartItems} = useAppSelector(state => state.cart);

  return (
    <Pressable
      onPress={() => navigation?.navigate('Cart')}
      style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
        }}>
        <Icon name="cart-outline" />
      </View>

      {cartItems.length !== 0 && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            backgroundColor: colors.primary,
            borderRadius: 10,
          }}>
          <Text variant="label" style={{color: colors.white}}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartIconButton;

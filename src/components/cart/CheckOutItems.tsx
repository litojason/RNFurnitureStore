import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {CartItem} from '../card';
import {useAppSelector} from '../../hooks/storeHooks';

const CheckOutItems = () => {
  const {colors} = useTheme();

  const {cartItems} = useAppSelector(state => state.cart);

  return (
    <View
      style={{
        padding: 16,
        paddingTop: 8,
        borderRadius: 8,
        gap: 8,
        backgroundColor: colors.surface,
      }}>
      <Text variant="h3">Items</Text>

      <View style={{gap: 16}}>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} data={cartItem} />
        ))}
      </View>
    </View>
  );
};

export default CheckOutItems;

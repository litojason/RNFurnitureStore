import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CartItem as ICartItem} from '../../types/cart.types';
import {currencyFormat, furnitureOptionsString} from '../../utils/stringFormat';
import {Text} from '../text';

type CartItemProps = {
  data: ICartItem;
};

const CartItem = ({data}: CartItemProps) => {
  const {colors} = useTheme();

  const {id, furnitureOption, quantity} = data;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}>
      <View style={{width: 76, height: 76, backgroundColor: 'grey'}} />

      <View style={{flex: 1, gap: 8}}>
        <View>
          <Text weight="semibold">{furnitureOption.furniture.name}</Text>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text variant="label" style={{color: colors.placeholder}}>
              {furnitureOptionsString(furnitureOption)}
            </Text>

            <Text variant="label" style={{color: colors.placeholder}}>
              x{quantity}
            </Text>
          </View>
        </View>

        <Text
          weight="semibold"
          style={{color: colors.primary, alignSelf: 'flex-end'}}>
          {currencyFormat(furnitureOption.price)}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;

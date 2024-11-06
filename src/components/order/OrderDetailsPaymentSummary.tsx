import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {currencyFormat} from '../../utils/stringFormat';
import {Text} from '../text';
import {useAppSelector} from '../../hooks/storeHooks';
import {Divider} from '../spacing';

const OrderDetailsPaymentSummary = () => {
  const {colors} = useTheme();

  const {orderDetails} = useAppSelector(state => state.order);

  if (!orderDetails) {
    return null;
  }

  const {
    orderItems,
    paymentMethod,
    totalItemsPrice,
    deliveryCharge,
    totalPrice,
  } = orderDetails;

  const numOfItems = orderItems.reduce(
    (previous, current) => previous + current.quantity,
    0,
  );

  const numOfItemsText = `Price (${numOfItems} ${
    numOfItems > 1 ? 'item' : 'items'
  })`;

  const renderPrice = (name: string, value: number, bold?: boolean) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text weight={bold ? 'semibold' : 'regular'}>{name}</Text>
        <Text weight={bold ? 'semibold' : 'regular'}>
          {currencyFormat(value)}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 16,
        paddingTop: 8,
        borderRadius: 8,
        gap: 8,
        backgroundColor: colors.surface,
      }}>
      <Text variant="h3">Payment Summary</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>Pay with</Text>
        <Text>{paymentMethod.name}</Text>
      </View>

      <Divider />

      <View>
        {renderPrice(numOfItemsText, totalItemsPrice)}
        {renderPrice('Delivery Charge', deliveryCharge)}
      </View>

      <Divider />

      {renderPrice('Total Price', totalPrice, true)}
    </View>
  );
};

export default OrderDetailsPaymentSummary;

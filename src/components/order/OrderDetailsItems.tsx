import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {OrderDetailsNavProp} from '../../types/navigation.types';
import {Text} from '../text';
import {OrderItem} from '../card';
import {useAppSelector} from '../../hooks/storeHooks';

type OrderDetailsItemsProps = {
  navigation: OrderDetailsNavProp['navigation'];
};

const OrderDetailsItems = ({navigation}: OrderDetailsItemsProps) => {
  const {colors} = useTheme();

  const {orderDetails} = useAppSelector(state => state.order);

  if (!orderDetails) {
    return null;
  }

  const {orderItems} = orderDetails;

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
        {orderItems.map(orderItem => (
          <OrderItem
            key={orderItem.id}
            data={orderItem}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

export default OrderDetailsItems;

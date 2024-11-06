import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {getDateFormat} from '../../lib/moment';
import {Text} from '../text';
import {Icon} from '../icon';
import {useAppSelector} from '../../hooks/storeHooks';

const OrderDetailsHeader = () => {
  const {colors} = useTheme();

  const {orderDetails} = useAppSelector(state => state.order);

  if (!orderDetails) {
    return <View />;
  }

  const {orderStatus, createdAt, paymentMethod, orderAddress} = orderDetails;
  const {name, phoneNumber, address, city, province, postalCode} = orderAddress;

  return (
    <View
      style={{
        padding: 16,
        paddingTop: 8,
        borderRadius: 8,
        gap: 8,
        backgroundColor: colors.surface,
      }}>
      <Text variant="h3">Order {orderStatus.name}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>Order Date</Text>
        <Text>{getDateFormat(createdAt)}</Text>
      </View>

      <View style={{flexDirection: 'row', gap: 8}}>
        <Icon name="map-marker-outline" />

        <View>
          <Text weight="semibold">
            {name}{' '}
            <Text style={{color: colors.placeholder}}>({phoneNumber})</Text>
          </Text>
          <Text>{address}</Text>
          <Text>
            {city}, {province}, {postalCode}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsHeader;

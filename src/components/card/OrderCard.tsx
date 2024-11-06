import React from 'react';
import {View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {OrdersNavProp} from '../../types/navigation.types';
import {Order, OrderStatuses} from '../../types/order.types';
import {currencyFormat, furnitureOptionsString} from '../../utils/stringFormat';
import {getDateFormat} from '../../lib/moment';
import {OrderStatusLabel, Text} from '../text';
import {Divider} from '../spacing';
import {Button} from '../button';

type OrderCardProps = {
  data: Order;
  navigation: OrdersNavProp['navigation'];
};

const OrderCard = ({data, navigation}: OrderCardProps) => {
  const {colors} = useTheme();

  const {id, orderStatus, totalPrice, orderItems, createdAt} = data;

  const handleCardOnPress = () => {
    navigation.navigate('OrderDetails', {orderId: id});
  };

  const handleReOrderPress = () => {};

  const {furnitureOption, quantity} = orderItems[0];
  const numOfOtherProducts = orderItems.length - 1;

  return (
    <Pressable
      onPress={handleCardOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: colors.surface,
          borderRadius: 8,
          gap: 8,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: colors.placeholder}}>
          {getDateFormat(createdAt)}
        </Text>

        <OrderStatusLabel data={orderStatus} />
      </View>

      <Divider />

      <View style={{gap: 4}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <View style={{width: 60, height: 60, backgroundColor: 'grey'}} />

          <View style={{flex: 1}}>
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
        </View>

        {numOfOtherProducts > 0 && (
          <Text variant="label" style={{color: colors.placeholder}}>
            +{numOfOtherProducts} other{' '}
            {numOfOtherProducts > 1 ? 'products' : 'product'}
          </Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text variant="label" style={{color: colors.placeholder}}>
            Total Price:
          </Text>
          <Text weight="semibold" style={{color: colors.primary}}>
            {currencyFormat(totalPrice)}
          </Text>
        </View>

        {orderStatus.name === OrderStatuses.COMPLETED && (
          <Button
            size="small"
            mode="outlined"
            text="Repeat"
            onPress={handleReOrderPress}
          />
        )}
      </View>
    </Pressable>
  );
};

export default OrderCard;

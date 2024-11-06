import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {OrderStatus} from '../../types/constant.types';
import Text from './Text';

type OrderStatusLabelProps = {
  data: OrderStatus;
};

const OrderStatusLabel = ({data}: OrderStatusLabelProps) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: colors.primaryContainer,
      }}>
      <Text
        variant="label-md"
        weight="semibold"
        style={{color: colors.primary}}>
        {data.name}
      </Text>
    </View>
  );
};

export default OrderStatusLabel;

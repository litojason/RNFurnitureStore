import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {Icon} from '../icon';

type CounterType = {
  quantity: number;
  onDeletePress: () => void;
};

const Counter = ({quantity, onDeletePress}: CounterType) => {
  const {colors} = useTheme();

  const handleLeftIconPress = () => {
    if (quantity === 1) return onDeletePress();
  };
  const handleRightIconPress = () => {};

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondaryContainer,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
        borderRadius: 4,
      }}>
      <Icon
        name={quantity === 1 ? 'delete-outline' : 'minus'}
        onPress={handleLeftIconPress}
      />
      <Text style={{width: 24, height: 24, textAlign: 'center'}}>
        {quantity}
      </Text>
      <Icon name="plus" onPress={handleRightIconPress} />
    </View>
  );
};

export default Counter;

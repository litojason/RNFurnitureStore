import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';

const FurnitureListItems = () => {
  const {colors} = useTheme();

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
        {/* {orderItems.map(orderItem => (
          <FurnitureItem
            key={orderItem.id}
            data={orderItem}
            navigation={navigation}
          />
        ))} */}
      </View>
    </View>
  );
};

export default FurnitureListItems;

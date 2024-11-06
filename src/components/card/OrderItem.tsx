import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {OrderDetailsNavProp} from '../../types/navigation.types';
import {OrderItem as IOrderItem} from '../../types/order.types';
import {currencyFormat, furnitureOptionsString} from '../../utils/stringFormat';
import {Text} from '../text';
import {useAppDispatch} from '../../hooks/storeHooks';
import {
  fetchFurnitureDetails,
  furnitureActions,
} from '../../store/reducers/furnitureReducer';

type OrderItemProps = {
  data: IOrderItem;
  navigation: OrderDetailsNavProp['navigation'];
};

const OrderItem = ({data, navigation}: OrderItemProps) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const {id, furnitureOption, quantity, price} = data;

  const handleCardOnPress = () => {
    dispatch(furnitureActions.resetSelectedAttribute());
    dispatch(fetchFurnitureDetails(furnitureOption.furnitureId));
    navigation.navigate('FurnitureDetails', {
      furnitureId: furnitureOption.furnitureId,
    });
  };

  return (
    <Pressable
      onPress={handleCardOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
      ]}>
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
          {currencyFormat(price)}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderItem;

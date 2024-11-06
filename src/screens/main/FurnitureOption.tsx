import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  ColorAttribute,
  OptionType,
  SizeAttribute,
} from '../../types/furniture.types';
import {FurnitureOptionNavProp} from '../../types/navigation.types';
import {Button, FurnitureOptionCard, Icon, Text} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {handleAddToCart} from '../../store/reducers/cartReducer';

const FurnitureOptionScreen = ({navigation}: FurnitureOptionNavProp) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const furniture = useAppSelector(state => state.furniture.furniture);
  const {colorOptions, sizeOptions, selectedColor, selectedSize} =
    useAppSelector(state => state.furniture);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    navigation.goBack();
  };

  const renderOption = (
    type: OptionType,
    title: string,
    options: ColorAttribute[] | SizeAttribute[],
  ) => {
    return (
      <View style={{gap: 4}}>
        <Text variant="h3">{title}</Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 16}}>
          {options.map(option => (
            <FurnitureOptionCard key={option.code} type={type} data={option} />
          ))}
        </View>
      </View>
    );
  };

  const handleButtonOnPress = () => {
    dispatch(handleAddToCart(undefined, handleCloseModal));
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleCloseModal}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: colors.modalOverlay,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          padding: 16,
          paddingBottom: insets.bottom + 16,
          gap: 32,
          backgroundColor: colors.background,
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text variant="h1">Variant</Text>
          <Icon name="window-close" onPress={handleCloseModal} />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
          <View style={{width: 120, height: 120, backgroundColor: 'grey'}} />

          <View>
            <Text variant="h3" style={{color: colors.primary}}>
              ${furniture?.furnitureOptions[0].price}
            </Text>
            <Text>Stock: {furniture?.furnitureOptions[0].quantity}</Text>
          </View>
        </View>

        {renderOption('color', 'Color', colorOptions)}
        {renderOption('size', 'Size', sizeOptions)}

        <Button
          disabled={!(selectedColor && selectedSize)}
          text="Add To Cart"
          leftIconName="cart-outline"
          onPress={handleButtonOnPress}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FurnitureOptionScreen;

import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CartNavProp} from '../../types/navigation.types';
import {CartItem} from '../../types/cart.types';
import {Text} from '../text';
import {Counter} from '../counter';
import {FurnitureOptionPicker} from '../button';
import {useAppDispatch} from '../../hooks/storeHooks';
import {
  fetchFurnitureDetails,
  furnitureActions,
} from '../../store/reducers/furnitureReducer';

type CartItemCardProps = {
  data: CartItem;
  navigation: CartNavProp['navigation'];
  setDeleteCartItemVisible: (visible: boolean) => void;
  setSelectedCartItemId: (selectedCartItemId: number) => void;
};

const CartItemCard = ({
  data,
  navigation,
  setDeleteCartItemVisible,
  setSelectedCartItemId,
}: CartItemCardProps) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const {furnitureOption, quantity} = data;
  const {furniture, price, colorAttribute, sizeAttribute} = furnitureOption;

  const handleSetSelectedAttributes = () => {
    dispatch(
      furnitureActions.setSelectedAttributes({
        selectedColor: colorAttribute,
        selectedSize: sizeAttribute,
      }),
    );
  };

  const handleCardOnPress = () => {
    handleSetSelectedAttributes();
    dispatch(fetchFurnitureDetails(furniture.id));
    navigation.navigate('FurnitureDetails', {furnitureId: furniture.id});
  };

  const handleDeletePress = () => {
    setSelectedCartItemId(data.id);
    setDeleteCartItemVisible(true);
  };

  return (
    <Pressable
      onPress={handleCardOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          alignItems: 'flex-end',
          padding: 16,
          backgroundColor: colors.surface,
          borderRadius: 8,
          gap: 16,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <View style={{width: 112, height: 112, backgroundColor: 'grey'}} />

        <View style={{flex: 1, paddingVertical: 8}}>
          <Text variant="label" style={{color: colors.placeholder}}>
            {furniture.category.name}
          </Text>
          <Text weight="semibold">{furniture.name}</Text>
          <Text weight="semibold" style={{color: colors.primary}}>
            ${price}
          </Text>

          <FurnitureOptionPicker
            data={data}
            navigation={navigation}
            onSetSelectedAttributes={handleSetSelectedAttributes}
          />
        </View>
      </View>

      <Counter quantity={quantity} onDeletePress={handleDeletePress} />
    </Pressable>
  );
};

export default CartItemCard;

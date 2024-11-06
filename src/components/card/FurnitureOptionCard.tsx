import React, {memo} from 'react';
import {View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ColorAttribute, OptionType} from '../../types/furniture.types';
import {Text} from '../text';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {furnitureActions} from '../../store/reducers/furnitureReducer';

type FurnitureOptionCardProps = {
  type: OptionType;
  data: ColorAttribute;
};

const FurnitureOptionCard = ({type, data}: FurnitureOptionCardProps) => {
  const {colors} = useTheme();

  const {selectedColor, selectedSize} = useAppSelector(
    state => state.furniture,
  );
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    if (type === 'color') dispatch(furnitureActions.setSelectedColor(data));
    else dispatch(furnitureActions.setSelectedSize(data));
  };

  const isColorSelected = type === 'color' && selectedColor?.code === data.code;
  const isSizeSelected = type === 'size' && selectedSize?.code === data.code;

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor:
            isColorSelected || isSizeSelected ? colors.primary : colors.surface,
        },
      ]}>
      {/* <View style={{width: 80, height: 80, backgroundColor: 'grey'}} /> */}
      <Text
        style={{
          color: isColorSelected || isSizeSelected ? colors.white : colors.text,
        }}>
        {data.name}
      </Text>
    </Pressable>
  );
};

// export default memo(FurnitureOptionCard);
export default FurnitureOptionCard;

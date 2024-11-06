import React from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CartNavProp} from '../../types/navigation.types';
import {CartItem} from '../../types/cart.types';
import {furnitureOptionsString} from '../../utils/stringFormat';
import {Text} from '../text';
import {Icon} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {fetchFurnitureDetails} from '../../store/reducers/furnitureReducer';

type FurnitureOptionPicker = {
  data: CartItem;
  navigation: CartNavProp['navigation'];
  onSetSelectedAttributes: () => void;
};

const FurnitureOptionPicker = ({
  data,
  navigation,
  onSetSelectedAttributes,
}: FurnitureOptionPicker) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const handlePickerOnPress = () => {
    onSetSelectedAttributes();
    dispatch(fetchFurnitureDetails(data.furnitureOption.furniture.id));
    navigation.navigate('FurnitureOption');
  };

  return (
    <Pressable
      onPress={handlePickerOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          paddingVertical: 4,
          paddingHorizontal: 8,
          gap: 4,
          backgroundColor: colors.background,
          borderRadius: 4,
        },
      ]}>
      <Text>{furnitureOptionsString(data.furnitureOption)}</Text>
      <Icon name="chevron-down" size={16} />
    </Pressable>
  );
};

export default FurnitureOptionPicker;

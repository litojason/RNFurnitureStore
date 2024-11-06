import React from 'react';
import {View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {dimensions} from '../../utils';
import {Furniture} from '../../types/furniture.types';
import {
  CategoryItemsNavProp,
  SearchNavProp,
} from '../../types/navigation.types';
import {Text} from '../text';
import {Icon} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {
  fetchFurnitureDetails,
  furnitureActions,
} from '../../store/reducers/furnitureReducer';

const imageWidth = (dimensions.screenWidth - 3 * 16) / 2;

type FurnitureCardProps = {
  data: Furniture;
  navigation: CategoryItemsNavProp['navigation'] | SearchNavProp['navigation'];
};

const FurnitureCard = ({data, navigation}: FurnitureCardProps) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    dispatch(furnitureActions.resetSelectedAttribute());
    dispatch(fetchFurnitureDetails(data.id));
    navigation.navigate('FurnitureDetails', {furnitureId: data.id});
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          width: imageWidth,
          backgroundColor: colors.surface,
          borderRadius: 8,
          overflow: 'hidden',
        },
      ]}>
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          backgroundColor: 'grey',
        }}
      />
      <View style={{padding: 8, gap: 4}}>
        <Text variant="label" weight="semibold">
          {data.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="star" size={14} />
          <Text variant="label-md">4.5</Text>
          <Text variant="label-md"> (2 Reviews)</Text>
        </View>
        <Text variant="label" weight="semibold" style={{color: colors.primary}}>
          ${data.furnitureOptions[0].price}
        </Text>
      </View>
    </Pressable>
  );
};

export default FurnitureCard;

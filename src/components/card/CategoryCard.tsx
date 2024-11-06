import React from 'react';
import {View, Pressable} from 'react-native';

import {dimensions} from '../../utils';
import {CategoryNavProp} from '../../types/navigation.types';
import {Category} from '../../types/category.types';
import {Text} from '../text';

type CategoryCardProps = {
  data: Category;
  navigation: CategoryNavProp['navigation'];
  size?: 'big' | 'small';
};

const CategoryCard = ({data, navigation, size = 'big'}: CategoryCardProps) => {
  const handleOnPress = () => {
    navigation.navigate('CategoryItems', {
      categoryId: data.id,
      name: data.name,
    });
  };

  const imageWidth =
    size === 'big'
      ? (dimensions.screenWidth - 3 * 16) / 2
      : (dimensions.screenWidth - 5 * 16) / 4;
  const variant = size === 'big' ? 'body' : 'label-md';

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          alignItems: 'center',
          width: imageWidth,
          gap: 4,
        },
      ]}>
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          backgroundColor: 'grey',
          borderRadius: 8,
        }}
      />
      <Text variant={variant}>{data.name}</Text>
    </Pressable>
  );
};

export default CategoryCard;

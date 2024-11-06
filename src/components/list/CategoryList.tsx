import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {HomeNavProp} from '../../types/navigation.types';
import {Text} from '../text';
import {CategoryCard} from '../card';
import {useAppSelector} from '../../hooks/storeHooks';

type CategoryListProps = {
  navigation: HomeNavProp['navigation'];
};

const CategoryList = ({navigation}: CategoryListProps) => {
  const {colors} = useTheme();

  const {categories} = useAppSelector(state => state.category);

  return (
    <View style={{gap: 4}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text variant="h3">Categories</Text>
        <Text
          variant="label"
          onPress={() => navigation.navigate('Categories')}
          style={{color: colors.primary, textDecorationLine: 'underline'}}>
          See All
        </Text>
      </View>

      <View style={{flexDirection: 'row', gap: 16}}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            data={category}
            navigation={navigation}
            size="small"
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryList;

import React from 'react';
import {FlatList} from 'react-native';

import {Category} from '../../../types/category.types';
import {CategoryNavProp} from '../../../types/navigation.types';
import {CategoryCard, Header, Screen} from '../../../components';
import {useAppSelector} from '../../../hooks/storeHooks';

const CategoriesScreen = ({navigation}: CategoryNavProp) => {
  const {categories} = useAppSelector(state => state.category);

  const _renderItem = ({item}: {item: Category}) => {
    return <CategoryCard data={item} navigation={navigation} />;
  };

  return (
    <Screen isBottomTabScreen>
      <Header title="Category" />
      <FlatList
        numColumns={2}
        data={categories}
        renderItem={_renderItem}
        keyExtractor={category => category.id.toString()}
        columnWrapperStyle={{gap: 16}}
        contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}
      />
    </Screen>
  );
};

export default CategoriesScreen;

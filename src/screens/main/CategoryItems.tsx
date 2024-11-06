import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {CategoryItemsNavProp} from '../../types/navigation.types';
import {Furniture} from '../../types/furniture.types';
import {FurnitureCard, Header, Screen} from '../../components';
import {getFurnitures} from '../../services/apis/furniture.api';

const CategoryItemsScreen = ({route, navigation}: CategoryItemsNavProp) => {
  const {categoryId, name} = route.params;
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);

  const handleGetFurnitures = () => {
    getFurnitures(categoryId).then(data => setFurnitures(data.furnitures));
  };

  useEffect(() => {
    handleGetFurnitures();
  }, []);

  const _renderItem = ({item}: {item: Furniture}) => {
    return <FurnitureCard data={item} navigation={navigation} />;
  };

  return (
    <Screen isSafeArea>
      <Header
        title={name}
        canGoBack
        navigation={navigation}
        rightIconName="magnify"
      />
      <FlatList
        numColumns={2}
        data={furnitures}
        renderItem={_renderItem}
        keyExtractor={furniture => furniture.id.toString()}
        columnWrapperStyle={{gap: 16}}
        contentContainerStyle={{padding: 16, gap: 16}}
      />
    </Screen>
  );
};

export default CategoryItemsScreen;

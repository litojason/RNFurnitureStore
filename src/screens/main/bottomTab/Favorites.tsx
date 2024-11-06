import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {FavoritesNavProp} from '../../../types/navigation.types';
import {Favorite} from '../../../types/favorite.types';
import {FurnitureCard, Header, Screen} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {fetchFavorites} from '../../../store/reducers/favoriteReducer';

const FavoritesScreen = ({navigation}: FavoritesNavProp) => {
  const {favorites} = useAppSelector(state => state.favorite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  const _renderItem = ({item}: {item: Favorite}) => {
    return <FurnitureCard data={item.furniture} navigation={navigation} />;
  };

  return (
    <Screen isBottomTabScreen>
      <Header title="Favorites" />
      <FlatList
        numColumns={2}
        data={favorites}
        renderItem={_renderItem}
        keyExtractor={favorite => favorite.id.toString()}
        columnWrapperStyle={{gap: 16}}
        contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}
      />
    </Screen>
  );
};

export default FavoritesScreen;

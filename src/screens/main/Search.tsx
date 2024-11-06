import React, {useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';

import {SearchNavProp} from '../../types/navigation.types';
import {Furniture} from '../../types/furniture.types';
import {
  FurnitureCard,
  Header,
  PopularSearches,
  RecentSearches,
  Screen,
  SearchInput,
  Text,
} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  fetchFurnitures,
  fetchPopularSearch,
  searchActions,
} from '../../store/reducers/searchReducer';

const SearchScreen = ({navigation}: SearchNavProp) => {
  const {searchValue, furnitures} = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();

  const refTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(fetchPopularSearch());
  }, []);

  // Clear ref to stop calling fetchFurnitures
  const clearRefTimer = () => {
    if (refTimer.current !== null) {
      clearTimeout(refTimer.current);
      refTimer.current = null;
    }
  };

  const handleOnChangeText = (text: string) => {
    // clear searchValue and furnitures in searches
    if (!text) dispatch(searchActions.resetSearchValue());

    dispatch(searchActions.setSearchValue(text));

    clearRefTimer();

    // only call fetchFurnitures if searchValue is not empty
    if (text) {
      refTimer.current = setTimeout(() => {
        dispatch(fetchFurnitures({search: text}));
      }, 2000);
    }
  };

  const _renderItem = ({item}: {item: Furniture}) => {
    return <FurnitureCard data={item} navigation={navigation} />;
  };

  return (
    <Screen isSafeArea>
      <Header title="Search" canGoBack navigation={navigation} />

      <View style={{padding: 16, paddingTop: 0, gap: 16}}>
        <SearchInput
          value={searchValue}
          onChangeText={handleOnChangeText}
          clearRefTimer={clearRefTimer}
        />

        {furnitures.length === 0 && !searchValue && (
          <>
            <PopularSearches />
            <RecentSearches />
          </>
        )}
      </View>

      {furnitures.length !== 0 && (
        <>
          <Text variant="h3" style={{paddingHorizontal: 16, marginBottom: 4}}>
            Results:
          </Text>
          <FlatList
            numColumns={2}
            data={furnitures}
            renderItem={_renderItem}
            keyExtractor={furniture => furniture.id.toString()}
            columnWrapperStyle={{gap: 16}}
            contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}
          />
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;

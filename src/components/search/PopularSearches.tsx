import React from 'react';
import {View} from 'react-native';

import {Text} from '../text';
import SearchLabel from './SearchLabel';
import {useAppSelector} from '../../hooks/storeHooks';

const PopularSearches = () => {
  const {popularSearches} = useAppSelector(state => state.search);

  if (popularSearches.length === 0) {
    return null;
  }

  return (
    <View style={{gap: 4}}>
      <Text variant="h3">Popular Searches:</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 16,
        }}>
        {popularSearches.map(popularSearch => (
          <SearchLabel
            key={popularSearch.id}
            type="popular"
            name={popularSearch.name}
          />
        ))}
      </View>
    </View>
  );
};

export default PopularSearches;

import React from 'react';
import {View} from 'react-native';

import {Text} from '../text';
import SearchLabel from './SearchLabel';
import {useAppSelector} from '../../hooks/storeHooks';

const RecentSearches = () => {
  const {recentSearches} = useAppSelector(state => state.search);

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={{gap: 4}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text variant="h3">Recent Searches:</Text>
        <Text variant="label" style={{textDecorationLine: 'underline'}}>
          Clear All
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 16,
        }}>
        {recentSearches.map(recentSearch => (
          <SearchLabel
            key={recentSearch.name}
            type="recent"
            name={recentSearch.name}
          />
        ))}
      </View>
    </View>
  );
};

export default RecentSearches;

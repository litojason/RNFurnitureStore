import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {Icon} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {
  fetchFurnitures,
  searchActions,
} from '../../store/reducers/searchReducer';

type SearchLabelProps = {
  name: string;
  type: 'popular' | 'recent';
};

const SearchLabel = ({name, type}: SearchLabelProps) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    dispatch(searchActions.setSearchValue(name));
    dispatch(fetchFurnitures({search: name}));
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          gap: 4,
          backgroundColor: colors.surface,
          borderRadius: 4,
        },
      ]}>
      {type === 'popular' && <Icon name="star" size={16} />}
      <Text variant="label">{name}</Text>
      {type === 'recent' && <Icon name="window-close" size={16} />}
    </Pressable>
  );
};

export default SearchLabel;

import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {HomeNavProp} from '../../types/navigation.types';
import {Text} from '../text';
import {Icon} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {searchActions} from '../../store/reducers/searchReducer';

interface SearchInputProps extends TextInputProps {
  navigateToSearchScreen?: boolean;
  navigation?: HomeNavProp['navigation'];
  clearRefTimer?: () => void;
}

const SearchInput = ({
  navigateToSearchScreen,
  navigation,
  clearRefTimer,
  ...props
}: SearchInputProps) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const handleResetSearchValue = () => {
    clearRefTimer && clearRefTimer();
    dispatch(searchActions.resetSearchValue());
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 56,
          paddingHorizontal: 16,
          gap: 8,
          backgroundColor: colors.surface,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: props.value ? colors.primary : colors.surface,
        }}>
        <Icon name="magnify" />

        {navigateToSearchScreen ? (
          <Text
            onPress={() => {
              handleResetSearchValue();
              navigation?.navigate('Search');
            }}
            style={{flex: 1, color: colors.placeholder}}>
            Search products...
          </Text>
        ) : (
          <TextInput
            placeholder="Search products..."
            placeholderTextColor={colors.placeholder}
            {...props}
            style={[
              {
                flex: 1,
                width: '100%',
                margin: 0,
                padding: 0,
                color: colors.text,

                fontSize: 16,
                // lineHeight: 24,
                fontFamily: 'Inter-Regular',
              },
              props.style,
            ]}
          />
        )}

        {props.value && (
          <Icon name="window-close" onPress={handleResetSearchValue} />
        )}
      </View>
    </View>
  );
};

export default SearchInput;

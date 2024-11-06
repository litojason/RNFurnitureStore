import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  SavedAddressesNavProp,
  SavedAddressesParams,
} from '../../types/navigation.types';
import {Address} from '../../types/address.types';
import {Text} from '../text';
import {Icon} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {cartActions} from '../../store/reducers/cartReducer';

type AddressCardProps = {
  data: Address;
  navigation: SavedAddressesNavProp['navigation'];
  screenBefore?: SavedAddressesParams['screenBefore'];
};

const AddressCard = ({data, navigation, screenBefore}: AddressCardProps) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const {id, name, phoneNumber, address, province, city, postalCode} = data;

  const handleOnPress = () => {
    if (screenBefore === 'cart') {
      dispatch(cartActions.setShippingDetails(data));
      navigation.goBack();
      return;
    }

    navigation.navigate('EditAddress', {addressId: id});
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderRadius: 8,
          backgroundColor: colors.surface,
        },
      ]}>
      <View style={{flex: 1}}>
        <Text weight="semibold">{name}</Text>
        <Text>{phoneNumber}</Text>
        <Text>{address}</Text>
        <Text>
          {city}, {province}, {postalCode}
        </Text>
      </View>

      {screenBefore !== 'cart' && <Icon name="chevron-right" />}
    </Pressable>
  );
};

export default AddressCard;

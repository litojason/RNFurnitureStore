import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CheckOutNavProp} from '../../types/navigation.types';
import {Text} from '../text';
import {useAppSelector} from '../../hooks/storeHooks';

type ShippingDetailsCardProps = {
  navigation: CheckOutNavProp['navigation'];
};

const ShippingDetails = ({navigation}: ShippingDetailsCardProps) => {
  const {colors} = useTheme();

  const {shippingDetails} = useAppSelector(state => state.cart);

  return (
    <View
      style={{
        padding: 16,
        paddingTop: 8,
        borderRadius: 8,
        gap: 8,
        backgroundColor: colors.surface,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text variant="h3">Shipping Details</Text>

        <Text
          variant="label"
          onPress={() =>
            navigation.navigate('SavedAddresses', {screenBefore: 'cart'})
          }
          style={{color: colors.primary, textDecorationLine: 'underline'}}>
          {shippingDetails ? 'Change' : 'Choose'}
        </Text>
      </View>

      {shippingDetails ? (
        <View>
          <Text weight="semibold">{shippingDetails.name}</Text>
          <Text>{shippingDetails.phoneNumber}</Text>
          <Text>{shippingDetails.address}</Text>
          <Text>
            {shippingDetails.city}, {shippingDetails.province},{' '}
            {shippingDetails.postalCode}
          </Text>
        </View>
      ) : (
        <Text>Please choose address for shipment</Text>
      )}
    </View>
  );
};

export default ShippingDetails;

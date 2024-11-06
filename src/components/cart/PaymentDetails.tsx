import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CheckOutNavProp} from '../../types/navigation.types';
import {maskCardNumber} from '../../utils';
import {Text} from '../text';
import {IconButton} from '../icon';
import {useAppSelector} from '../../hooks/storeHooks';

type PaymentDetailsProps = {
  navigation: CheckOutNavProp['navigation'];
};

const PaymentDetails = ({navigation}: PaymentDetailsProps) => {
  const {colors} = useTheme();

  const {paymentDetails} = useAppSelector(state => state.cart);

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
        <Text variant="h3">Payment Details</Text>

        <Text
          variant="label"
          onPress={() =>
            navigation.navigate('PaymentMethods', {screenBefore: 'cart'})
          }
          style={{color: colors.primary, textDecorationLine: 'underline'}}>
          {paymentDetails ? 'Change' : 'Choose'}
        </Text>
      </View>

      {paymentDetails ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
          <IconButton name="credit-card-outline" size={48} />

          <View style={{flex: 1}}>
            <Text weight="semibold">
              {maskCardNumber(paymentDetails.cardNumber)}
            </Text>
            <Text>Exp: {paymentDetails.expirationDate}</Text>
          </View>
        </View>
      ) : (
        <Text>Please choose payment method</Text>
      )}
    </View>
  );
};

export default PaymentDetails;

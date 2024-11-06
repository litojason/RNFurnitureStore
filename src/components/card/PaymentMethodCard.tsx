import React from 'react';
import {Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {UserPaymentMethod} from '../../types/paymentMethod.types';
import {
  PaymentMethodsNavProp,
  PaymentMethodsParams,
} from '../../types/navigation.types';
import {maskCardNumber} from '../../utils';
import {Text} from '../text';
import {Icon, IconButton} from '../icon';
import {useAppDispatch} from '../../hooks/storeHooks';
import {cartActions} from '../../store/reducers/cartReducer';

type PaymentMethodCardProps = {
  data: UserPaymentMethod;
  navigation: PaymentMethodsNavProp['navigation'];
  screenBefore?: PaymentMethodsParams['screenBefore'];
};

const PaymentMethodCard = ({
  data,
  navigation,
  screenBefore,
}: PaymentMethodCardProps) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const {id, cardNumber, expirationDate} = data;

  const handleOnPress = () => {
    if (screenBefore === 'cart') {
      dispatch(cartActions.setPaymentDetails(data));
      navigation.goBack();
      return;
    }

    navigation.navigate('CardPayment', {cardId: id});
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
          backgroundColor: colors.surface,
          borderRadius: 8,
          gap: 16,
        },
      ]}>
      <IconButton name="credit-card-outline" size={48} />

      <View style={{flex: 1}}>
        <Text weight="semibold">{maskCardNumber(cardNumber)}</Text>
        <Text>Exp: {expirationDate}</Text>
      </View>

      {screenBefore !== 'cart' && <Icon name="chevron-right" />}
    </Pressable>
  );
};

export default PaymentMethodCard;

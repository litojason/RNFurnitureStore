import React from 'react';
import {Alert, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {currencyFormat} from '../../utils/stringFormat';
import {Text} from '../text';
import {Button} from '../button';
import {postOrder} from '../../services/apis/order.api';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchOrders} from '../../store/reducers/orderReducer';
import {CartNavProp} from '../../types/navigation.types';

type CartFooterProps = {
  navigation: CartNavProp['navigation'];
};

const CartFooter = ({navigation}: CartFooterProps) => {
  const {colors} = useTheme();

  const {
    totalPrice,
    cartItems,
    totalItemsPrice,
    shippingDetails,
    paymentDetails,
  } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const disabledButton = cartItems.length === 0;

  // const handlePostOrder = () => {
  //   if (!shippingDetails) return;
  //   if (!paymentDetails) return;

  //   postOrder({
  //     addressId: shippingDetails.id,
  //     paymentMethodId: paymentDetails.paymentMethodId,
  //   })
  //     .then(responseData => {
  //       dispatch(fetchOrders());
  //       navigation.navigate('MainBottomTab', {screen: 'Orders'});
  //     })
  //     .catch(e => {
  //       Alert.alert('Post Order Failed', e.message);
  //     });
  // };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.surface,
      }}>
      <Text variant="h1" style={{color: colors.primary}}>
        {currencyFormat(totalItemsPrice)}
      </Text>

      <Button
        disabled={disabledButton}
        text="Check Out"
        leftIconName="cart-arrow-down"
        onPress={() => navigation.navigate('CheckOut')}
      />
    </View>
  );
};

export default CartFooter;

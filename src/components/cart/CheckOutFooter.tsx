import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CheckOutNavProp} from '../../types/navigation.types';
import {currencyFormat} from '../../utils/stringFormat';
import {Text} from '../text';
import {Button} from '../button';
import {ModalAlert} from '../modal';
import {postOrder} from '../../services/apis/order.api';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchOrders} from '../../store/reducers/orderReducer';
import {fetchCartItems} from '../../store/reducers/cartReducer';

type CheckOutFooterProps = {
  navigation: CheckOutNavProp['navigation'];
};

const CheckOutFooter = ({navigation}: CheckOutFooterProps) => {
  const {colors} = useTheme();

  const {totalPrice, shippingDetails, paymentDetails} = useAppSelector(
    state => state.cart,
  );
  const dispatch = useAppDispatch();

  const [postOrderSuccessVisible, setPostOrderSuccessVisible] = useState(false);

  const disabledButton = !shippingDetails && !paymentDetails;

  const handlePostOrder = () => {
    if (!shippingDetails) return;
    if (!paymentDetails) return;

    postOrder({
      addressId: shippingDetails.id,
      paymentMethodId: paymentDetails.paymentMethodId,
    })
      .then(responseData => {
        dispatch(fetchOrders());
        setPostOrderSuccessVisible(true);
      })
      .catch(e => {
        Alert.alert('Post Order Failed', e.message);
      });
  };

  return (
    <>
      <ModalAlert
        cancelable={false}
        visible={postOrderSuccessVisible}
        setVisible={setPostOrderSuccessVisible}
        title="Place Order Success"
        description="Order has been added."
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              dispatch(fetchCartItems());
              navigation.navigate('MainBottomTab', {screen: 'Orders'});
            },
          },
        ]}
      />

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
          {currencyFormat(totalPrice)}
        </Text>

        <Button
          disabled={disabledButton}
          text="Check Out"
          leftIconName="cart-arrow-down"
          onPress={handlePostOrder}
        />
      </View>
    </>
  );
};

export default CheckOutFooter;

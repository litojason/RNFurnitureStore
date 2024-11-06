import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';

import {OrderDetailsNavProp} from '../../types/navigation.types';
import {
  Button,
  Header,
  OrderDetailsHeader,
  OrderDetailsItems,
  OrderDetailsPaymentSummary,
  Screen,
  ScreenLoading,
} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchOrderById} from '../../store/reducers/orderReducer';
import {OrderStatuses} from '../../types/order.types';

const OrderDetailsScreen = ({navigation, route}: OrderDetailsNavProp) => {
  const {orderDetails} = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  const {orderId} = route.params;

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, []);

  if (!orderDetails) {
    return <ScreenLoading />;
  }

  const {orderStatus} = orderDetails;

  const handleReOrderPress = () => {};

  return (
    <Screen isSafeArea>
      <Header title="Details" canGoBack navigation={navigation} />

      <ScrollView contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}>
        <OrderDetailsHeader />

        <OrderDetailsItems navigation={navigation} />

        <OrderDetailsPaymentSummary />
      </ScrollView>

      {orderStatus.name === OrderStatuses.COMPLETED && (
        <View style={{padding: 16, paddingTop: 0}}>
          <Button mode="outlined" text="Repeat" onPress={handleReOrderPress} />
        </View>
      )}
    </Screen>
  );
};

export default OrderDetailsScreen;

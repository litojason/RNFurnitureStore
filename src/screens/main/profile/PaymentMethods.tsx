import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {PaymentMethodsNavProp} from '../../../types/navigation.types';
import {UserPaymentMethod} from '../../../types/paymentMethod.types';
import {Header, PaymentMethodCard, Screen, Text} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {
  fetchUserPaymentMethods,
  paymentMethodActions,
} from '../../../store/reducers/paymentMethodReducer';

const PaymentMethodsScreen = ({navigation, route}: PaymentMethodsNavProp) => {
  const {paymentMethods, paymentMethodsLoading} = useAppSelector(
    state => state.paymentMethod,
  );
  const dispatch = useAppDispatch();

  const screenBefore = route.params?.screenBefore;

  useEffect(() => {
    dispatch(fetchUserPaymentMethods());
  }, []);

  const handleRightIconOnPress = () => {
    dispatch(paymentMethodActions.resetCardPaymentForm());
    navigation.navigate('CardPayment', {});
  };

  const _renderPaymentMethod = ({item}: {item: UserPaymentMethod}) => {
    return (
      <PaymentMethodCard
        data={item}
        navigation={navigation}
        screenBefore={screenBefore}
      />
    );
  };

  return (
    <Screen isSafeArea>
      <Header
        title="Payment Methods"
        canGoBack
        navigation={navigation}
        rightIconName="plus"
        rightIconOnPress={handleRightIconOnPress}
      />

      <FlatList
        data={paymentMethods}
        keyExtractor={paymentMethod => paymentMethod.id.toString()}
        renderItem={_renderPaymentMethod}
        refreshing={paymentMethodsLoading}
        ListHeaderComponent={<Text variant="h3">Card Payments</Text>}
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          paddingTop: 0,
        }}
      />
    </Screen>
  );
};

export default PaymentMethodsScreen;

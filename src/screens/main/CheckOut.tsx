import React from 'react';
import {ScrollView} from 'react-native';

import {CheckOutNavProp} from '../../types/navigation.types';
import {
  CheckOutFooter,
  CheckOutItems,
  Header,
  PaymentDetails,
  PaymentSummary,
  Screen,
  ShippingDetails,
} from '../../components';

const CheckOutScreen = ({navigation}: CheckOutNavProp) => {
  return (
    <Screen isSafeArea>
      <Header title="Check Out" canGoBack navigation={navigation} />

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 0,
          gap: 16,
        }}>
        <CheckOutItems />
        <ShippingDetails navigation={navigation} />
        <PaymentDetails navigation={navigation} />
        <PaymentSummary />
      </ScrollView>

      <CheckOutFooter navigation={navigation} />
    </Screen>
  );
};

export default CheckOutScreen;

import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {OrdersNavProp} from '../../../types/navigation.types';
import {Order} from '../../../types/order.types';
import {Header, OrderCard, Screen} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {fetchOrders} from '../../../store/reducers/orderReducer';

const OrdersScreen = ({navigation}: OrdersNavProp) => {
  const {orders} = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const _renderItem = ({item}: {item: Order}) => {
    return <OrderCard data={item} navigation={navigation} />;
  };

  return (
    <Screen isBottomTabScreen>
      <Header title="My Orders" />

      <FlatList
        data={orders}
        renderItem={_renderItem}
        keyExtractor={category => category.id.toString()}
        contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}
      />
    </Screen>
  );
};

export default OrdersScreen;

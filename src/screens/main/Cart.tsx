import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {CartNavProp} from '../../types/navigation.types';
import {CartItem} from '../../types/cart.types';
import {
  CartItemCard,
  CartFooter,
  Header,
  ModalAlert,
  Screen,
} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  deleteItemInCart,
  fetchCartItems,
} from '../../store/reducers/cartReducer';

const CartScreen = ({navigation}: CartNavProp) => {
  const {cartId, cartItems} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const [selectedCartItemId, setSelectedCartItemId] = useState(-1);
  const [deleteCartItemVisible, setDeleteCartItemVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const _renderCartItem = ({item}: {item: CartItem}) => {
    return (
      <CartItemCard
        data={item}
        navigation={navigation}
        setDeleteCartItemVisible={setDeleteCartItemVisible}
        setSelectedCartItemId={setSelectedCartItemId}
      />
    );
  };

  return (
    <>
      <ModalAlert
        visible={deleteCartItemVisible}
        setVisible={setDeleteCartItemVisible}
        title="Delete Item?"
        description="Are you sure you want to delete this item?"
        buttons={[
          {text: 'Cancel', onPress: () => setDeleteCartItemVisible(false)},
          {
            text: 'Delete',
            mode: 'text',
            type: 'destructive',
            onPress: () => {
              dispatch(deleteItemInCart({id: selectedCartItemId, cartId}));
              setDeleteCartItemVisible(false);
            },
          },
        ]}
      />

      <Screen isSafeArea>
        <Header title="Cart" canGoBack navigation={navigation} />

        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.id.toString()}
          renderItem={_renderCartItem}
          contentContainerStyle={{padding: 16, paddingTop: 0, gap: 16}}
        />

        <CartFooter navigation={navigation} />
      </Screen>
    </>
  );
};

export default CartScreen;

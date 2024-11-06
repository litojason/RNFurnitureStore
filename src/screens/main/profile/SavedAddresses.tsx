import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {SavedAddressesNavProp} from '../../../types/navigation.types';
import {Address} from '../../../types/address.types';
import {AddressCard, Header, Screen} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {
  addressActions,
  fetchAddresses,
} from '../../../store/reducers/addressReducer';

const SavedAddressesScreen = ({navigation, route}: SavedAddressesNavProp) => {
  const {addresses} = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();

  const screenBefore = route.params?.screenBefore;

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  const handleRightIconOnPress = () => {
    dispatch(addressActions.resetAddressForm());
    navigation.navigate('EditAddress', {});
  };

  const _renderAddress = ({item}: {item: Address}) => {
    return (
      <AddressCard
        data={item}
        navigation={navigation}
        screenBefore={screenBefore}
      />
    );
  };

  return (
    <Screen isSafeArea>
      <Header
        title="Saved Addresses"
        canGoBack
        navigation={navigation}
        rightIconName="plus"
        rightIconOnPress={handleRightIconOnPress}
      />

      <FlatList
        data={addresses}
        keyExtractor={address => address.id.toString()}
        renderItem={_renderAddress}
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          paddingTop: 0,
        }}
      />
    </Screen>
  );
};

export default SavedAddressesScreen;

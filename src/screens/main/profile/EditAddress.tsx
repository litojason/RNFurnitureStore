import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {EditAddressNavProp} from '../../../types/navigation.types';
import {EditAddressForm, Header, ModalAlert, Screen} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {
  fetchAddressById,
  fetchAddresses,
} from '../../../store/reducers/addressReducer';
import {deleteAddress} from '../../../services/apis/address.api';

const EditAddressScreen = ({navigation, route}: EditAddressNavProp) => {
  const {colors} = useTheme();

  const {addressDetailsLoading} = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();

  const {addressId} = route.params;

  const [deleteAddressVisible, setDeleteAddressVisible] = useState(false);

  const action = addressId ? 'Edit' : 'Add';

  useEffect(() => {
    if (addressId) dispatch(fetchAddressById(addressId));
  }, []);

  const deleteUserAddress = () => {
    deleteAddress(addressId!)
      .then(responseData => {
        dispatch(fetchAddresses());
        navigation.goBack();
      })
      .catch(e => {
        Alert.alert('Delete Address Failed', e.message);
      });
  };

  const handleRightIconOnPress = () => {
    setDeleteAddressVisible(true);
  };
  return (
    <>
      <ModalAlert
        visible={deleteAddressVisible}
        setVisible={setDeleteAddressVisible}
        title="Delete Address?"
        description="Are you sure you want to delete address? This action cannot be undone."
        buttons={[
          {text: 'Cancel', onPress: () => setDeleteAddressVisible(false)},
          {
            text: 'Delete',
            mode: 'text',
            type: 'destructive',
            onPress: deleteUserAddress,
          },
        ]}
      />

      <Screen isSafeArea>
        <Header
          title={`${action} Address`}
          canGoBack
          navigation={navigation}
          rightIconName={addressId ? 'delete-outline' : undefined}
          rightIconOnPress={handleRightIconOnPress}
          rigthIconColor={colors.error}
        />

        <View style={{flex: 1, padding: 16, paddingTop: 0}}>
          {!addressDetailsLoading && (
            <EditAddressForm addressId={addressId} navigation={navigation} />
          )}
        </View>
      </Screen>
    </>
  );
};

export default EditAddressScreen;

import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {useForm} from 'react-hook-form';

import {EditAddressNavProp} from '../../types/navigation.types';
import {AddressCreation} from '../../types/address.types';
import {Input} from '../input';
import {Button} from '../button';
import {ModalAlert} from '../modal';
import {editAddressResolver} from '../../validators/address.validator';
import {postAddress, updateAddress} from '../../services/apis/address.api';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchAddresses} from '../../store/reducers/addressReducer';

type EditAddressFormProps = {
  addressId?: number;
  navigation: EditAddressNavProp['navigation'];
};

const EditAddressForm = ({addressId, navigation}: EditAddressFormProps) => {
  const {addressDetails} = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();

  const {control, handleSubmit, setError} = useForm<AddressCreation>({
    mode: 'onChange',
    resolver: editAddressResolver,
    defaultValues: {
      name: addressDetails?.name,
      address: addressDetails?.address,
      province: addressDetails?.province,
      city: addressDetails?.city,
      postalCode: addressDetails?.postalCode,
      phoneNumber: addressDetails?.phoneNumber,
    },
  });

  const [editAddressSuccessVisible, setEditAddressSuccessVisible] =
    useState(false);

  const action = addressId ? 'Edit' : 'Add';

  const onSubmit = (data: AddressCreation) => {
    const api =
      action === 'Add' ? postAddress(data) : updateAddress(addressId!, data);

    api
      .then(responseData => {
        dispatch(fetchAddresses());
        setEditAddressSuccessVisible(true);
      })
      .catch(e => {
        Alert.alert(`${action === 'Add'} Address Failed`, e.message);
      });
  };

  return (
    <>
      <ModalAlert
        cancelable={false}
        visible={editAddressSuccessVisible}
        setVisible={setEditAddressSuccessVisible}
        title={`${action} Address Success`}
        description={`Your address has been ${
          action === 'Add' ? 'added' : 'updated'
        }.`}
        buttons={[
          {
            text: 'OK',
            onPress: navigation.goBack,
          },
        ]}
      />

      <View style={{flex: 1, justifyContent: 'space-between', gap: 16}}>
        <View style={{gap: 16}}>
          <Input
            control={control}
            name="name"
            label="Name"
            leftIconName="account-outline"
            placeholder="eg. John Doe"
            hint="* Minimum 2 characters"
            autoCapitalize="words"
          />

          <Input
            control={control}
            name="phoneNumber"
            label="Phone Number"
            leftIconName="phone-outline"
            placeholder="eg. 081212341234"
            keyboardType="phone-pad"
          />

          <Input
            control={control}
            name="address"
            label="Address"
            leftIconName="map-marker-outline"
            placeholder="eg. Some Street"
          />

          <Input
            control={control}
            name="province"
            label="Province"
            leftIconName="earth"
            placeholder="eg. East Java"
          />

          <Input
            control={control}
            name="city"
            label="City"
            leftIconName="city-variant-outline"
            placeholder="eg. Malang"
          />

          <Input
            control={control}
            name="postalCode"
            label="Postal Code"
            leftIconName="mailbox-outline"
            placeholder="eg. 12345"
          />
        </View>

        <Button
          text={action}
          leftIconName={action === 'Add' ? 'plus' : 'square-edit-outline'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default EditAddressForm;

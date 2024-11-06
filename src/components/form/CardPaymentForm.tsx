import {View, Alert} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {CardPaymentNavProp} from '../../types/navigation.types';
import {UserPaymentMethodCreation} from '../../types/paymentMethod.types';
import {Input} from '../input';
import {Button} from '../button';
import {ModalAlert} from '../modal';
import {cardPaymentResolver} from '../../validators/paymentMethod.validator';
import {
  postUserPaymentMethod,
  updateUserPaymentMethod,
} from '../../services/apis/paymentMethod.api';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {fetchUserPaymentMethods} from '../../store/reducers/paymentMethodReducer';

type CardPaymentFormProps = {
  cardId?: number;
  navigation: CardPaymentNavProp['navigation'];
};

const CardPaymentForm = ({cardId, navigation}: CardPaymentFormProps) => {
  const {cardDetails} = useAppSelector(state => state.paymentMethod);
  const dispatch = useAppDispatch();

  const {control, handleSubmit, setError} = useForm<UserPaymentMethodCreation>({
    mode: 'onChange',
    resolver: cardPaymentResolver,
    defaultValues: {
      cardNumber: cardDetails?.cardNumber,
      expirationDate: cardDetails?.expirationDate,
      cvc: cardDetails?.cvc,
    },
  });

  const [cardPaymentSuccessVisible, setCardPaymentSuccessVisible] =
    useState(false);

  const action = cardId ? 'Edit' : 'Add';

  const onSubmit = (data: UserPaymentMethodCreation) => {
    // setIsLoading(true);

    const api =
      action === 'Add'
        ? postUserPaymentMethod(data)
        : updateUserPaymentMethod(cardId!, data);

    api
      .then(responseData => {
        dispatch(fetchUserPaymentMethods());
        setCardPaymentSuccessVisible(true);
      })
      .catch(e => {
        Alert.alert(`${action === 'Add'} Card Failed`, e.message);
      });
    // .finally(() => setIsLoading(false));
  };

  return (
    <>
      <ModalAlert
        cancelable={false}
        visible={cardPaymentSuccessVisible}
        setVisible={setCardPaymentSuccessVisible}
        title={`${action} Card Payment Success`}
        description={`Your card has been ${
          action === 'Add' ? 'added' : 'updated'
        } and ready to be used.`}
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
            name="cardNumber"
            label="Card number"
            leftIconName="credit-card-outline"
            placeholder="eg. 1234 1234 1234"
          />

          <Input
            control={control}
            name="expirationDate"
            label="Expiration date"
            leftIconName="calendar-blank-outline"
            placeholder="MM / YY"
          />

          <Input
            control={control}
            name="cvc"
            label="CVC"
            leftIconName="credit-card-outline"
            placeholder="CVC"
            secureTextEntry
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

export default CardPaymentForm;

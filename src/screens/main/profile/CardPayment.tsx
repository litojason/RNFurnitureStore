import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {CardPaymentForm, Header, ModalAlert, Screen} from '../../../components';
import {CardPaymentNavProp} from '../../../types/navigation.types';
import {deleteUserPaymentMethod} from '../../../services/apis/paymentMethod.api';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {
  fetchCardDetails,
  fetchUserPaymentMethods,
} from '../../../store/reducers/paymentMethodReducer';

const CardPaymentScreen = ({navigation, route}: CardPaymentNavProp) => {
  const {colors} = useTheme();

  const {cardDetailsLoading} = useAppSelector(state => state.paymentMethod);
  const dispatch = useAppDispatch();

  const {cardId} = route.params;

  const [deleteCardVisible, setDeleteCardVisible] = useState(false);

  useEffect(() => {
    if (cardId) dispatch(fetchCardDetails(cardId));
  }, []);

  const deleteCard = () => {
    deleteUserPaymentMethod(cardId!)
      .then(responseData => {
        dispatch(fetchUserPaymentMethods());
        navigation.goBack();
      })
      .catch(e => {
        Alert.alert('Delete Card Failed', e.message);
      });
  };

  const handleRightIconOnPress = () => {
    setDeleteCardVisible(true);
  };

  return (
    <>
      <ModalAlert
        visible={deleteCardVisible}
        setVisible={setDeleteCardVisible}
        title="Delete Card?"
        description="Are you sure you want to delete card? This action cannot be undone."
        buttons={[
          {text: 'Cancel', onPress: () => setDeleteCardVisible(false)},
          {
            text: 'Delete',
            mode: 'text',
            type: 'destructive',
            onPress: deleteCard,
          },
        ]}
      />

      <Screen isSafeArea>
        <Header
          title="Card Payment"
          canGoBack
          navigation={navigation}
          rightIconName={cardId ? 'delete-outline' : undefined}
          rightIconOnPress={handleRightIconOnPress}
          rigthIconColor={colors.error}
        />

        <View style={{flex: 1, padding: 16, paddingTop: 0}}>
          {!cardDetailsLoading && (
            <CardPaymentForm cardId={cardId} navigation={navigation} />
          )}
        </View>
      </Screen>
    </>
  );
};

export default CardPaymentScreen;

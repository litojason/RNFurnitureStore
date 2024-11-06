import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {dimensions} from '../../utils';
import {FurnitureDetailsNavProp} from '../../types/navigation.types';
import {currencyFormat} from '../../utils/stringFormat';
import {
  Button,
  FurnitureOptionCard,
  Header,
  Icon,
  Screen,
  Text,
} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {handleAddToCart} from '../../store/reducers/cartReducer';
import {fetchFurnitureDetails} from '../../store/reducers/furnitureReducer';

const imageWidth = dimensions.screenWidth;

const FurnitureDetailsScreen = ({
  route,
  navigation,
}: FurnitureDetailsNavProp) => {
  const {colors} = useTheme();

  const {furnitureId} = route.params;

  const furniture = useAppSelector(state => state.furniture.furniture);
  const {colorOptions, sizeOptions} = useAppSelector(state => state.furniture);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchFurnitureDetails(furnitureId));
  // }, []);

  const handleOpenModal = () => {
    navigation.navigate('FurnitureOption');
  };

  const handleButtonOnPress = () => {
    dispatch(handleAddToCart(handleOpenModal));
  };

  const numOfColors = colorOptions.length;
  const numOfSizes = sizeOptions.length;

  const colorText = numOfColors <= 1 ? 'color' : 'colors';
  const sizeText = numOfSizes <= 1 ? 'size' : 'sizes';

  const variantText = `Variant (${numOfColors} ${colorText}, ${numOfSizes} ${sizeText})`;

  return (
    <Screen isSafeArea>
      <Header
        title={furniture?.category.name!}
        canGoBack
        navigation={navigation}
        showCart
      />
      <ScrollView>
        <View
          style={{
            width: imageWidth,
            height: imageWidth,
            backgroundColor: 'grey',
          }}
        />

        <View style={{flex: 1, padding: 16, gap: 36}}>
          <View style={{gap: 8}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenModal}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{variantText}</Text>

              <Icon name="chevron-right" />
            </TouchableOpacity>

            <View style={{flexDirection: 'row', gap: 16}}>
              {colorOptions.map(option => (
                <FurnitureOptionCard
                  key={option.code}
                  type="color"
                  data={option}
                />
              ))}
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text variant="h1" weight="semibold">
                {furniture?.name}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" size={14} />
                <Text>4.5</Text>
                <Text> (2 Reviews)</Text>
              </View>

              <Text
                variant="h3"
                weight="semibold"
                style={{color: colors.primary}}>
                ${furniture?.furnitureOptions[0].price}
              </Text>
            </View>

            <Icon name="heart-outline" color={colors.placeholder} />
          </View>

          <View>
            <Text variant="h3">Description</Text>
            <Text>{furniture?.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: colors.surface,
        }}>
        <Text variant="h1" style={{color: colors.primary}}>
          {currencyFormat(furniture?.furnitureOptions[0].price || 0)}
        </Text>

        <Button
          text="Add To Cart"
          leftIconName="cart-outline"
          onPress={handleButtonOnPress}
        />
      </View>
    </Screen>
  );
};

export default FurnitureDetailsScreen;

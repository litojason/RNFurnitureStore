import React from 'react';
import {ColorValue, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';

import {IconButton} from '../icon';
import {Text} from '../text';
import CartIconButton from '../icon/CartIconButton';

type HeaderProps = {
  title: string;
  leftIconName?: string;
  leftIconOnPress?: () => void;
  rightIconName?: string;
  rightIconOnPress?: () => void;
  rigthIconColor?: ColorValue;
  canGoBack?: boolean;
  navigation?: NavigationProp<any, any>;
  showCart?: boolean;
};

const Header = ({
  title,
  leftIconName,
  leftIconOnPress,
  rightIconName,
  rightIconOnPress,
  rigthIconColor,
  canGoBack,
  navigation,
  showCart,
}: HeaderProps) => {
  const {colors} = useTheme();

  const handleCartButtonOnPress = () => {
    navigation?.navigate('Cart');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 72,
        padding: 16,
      }}>
      {canGoBack ? (
        <IconButton
          mode="text"
          name="chevron-left"
          onPress={navigation?.goBack}
        />
      ) : leftIconName ? (
        <IconButton mode="text" name={leftIconName} />
      ) : (
        <View style={{width: 40}} />
      )}

      <Text variant="h1" style={{color: colors.primary}}>
        {title}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 0}}>
        {showCart && <CartIconButton navigation={navigation} />}

        {rightIconName && (
          <IconButton
            mode="text"
            name={rightIconName}
            iconColor={rigthIconColor}
            onPress={rightIconOnPress}
          />
        )}

        {!showCart && !rightIconName && <View style={{width: 40}} />}
      </View>
    </View>
  );
};

export default Header;

import React from 'react';
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Icon from './Icon';

interface IconButtonProps extends PressableProps {
  name: string;
  mode?: 'contained' | 'outlined' | 'text';
  buttonStyle?: StyleProp<ViewStyle>;
  iconColor?: ColorValue;
  size?: number;
}

const IconButton = ({
  name,
  mode = 'contained',
  buttonStyle,
  iconColor,
  size,
  ...props
}: IconButtonProps) => {
  const {colors} = useTheme();

  const bgColor = mode === 'contained' ? colors.primary : undefined;
  const borderColor =
    mode === 'contained' || mode === 'outlined'
      ? colors.primary
      : 'transparent';
  const textColor = iconColor
    ? iconColor
    : mode === 'contained'
    ? colors.white
    : colors.primary;

  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        {
          opacity: props.disabled
            ? 0.6
            : props.onPress
            ? pressed
              ? 0.8
              : 1
            : 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: size || 40,
          height: size || 40,
          backgroundColor: bgColor,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: borderColor,
        },
        buttonStyle,
      ]}>
      <Icon name={name} color={textColor} />
    </Pressable>
  );
};

export default IconButton;

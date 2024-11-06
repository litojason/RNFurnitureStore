import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {Icon} from '../icon';

interface ButtonProps extends PressableProps {
  mode?: 'contained' | 'outlined' | 'text';
  type?: 'primary' | 'destructive';
  size?: 'small' | 'default';
  text?: string;
  leftIconName?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const Button = ({
  mode = 'contained',
  type = 'primary',
  text = 'Button',
  size = 'default',
  leftIconName,
  buttonStyle,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const {colors} = useTheme();

  const isSmall = size === 'small';

  const paddingHorizontal = isSmall ? 8 : 16;
  const height = isSmall ? 28 : 40;
  const borderWidth = isSmall ? 1 : 2;

  const color = type === 'primary' ? colors.primary : colors.error;
  const bgColor = mode === 'contained' ? color : undefined;
  const borderColor =
    mode === 'contained' || mode === 'outlined' ? color : 'transparent';

  const textColor =
    mode === 'outlined' || mode === 'text' ? color : colors.white;
  const textVariant = size === 'small' ? 'label' : 'body';

  return (
    <Pressable
      disabled={isLoading}
      {...props}
      style={({pressed}) => [
        {
          opacity: props.disabled
            ? 0.6
            : isLoading
            ? 0.8
            : props.onPress
            ? pressed
              ? 0.8
              : 1
            : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height,
          paddingHorizontal,
          gap: 8,
          backgroundColor: bgColor,
          borderRadius: 4,
          borderWidth,
          borderColor,
        },
        buttonStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={24} color={textColor} />
      ) : (
        <>
          {leftIconName && <Icon name={leftIconName} color={textColor} />}
          <Text
            variant={textVariant}
            weight="semibold"
            style={{color: textColor}}>
            {text}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default Button;

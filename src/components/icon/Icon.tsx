import React from 'react';
import {ColorValue, TextProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps extends TextProps {
  size?: number | undefined;
  name: string;
  color?: ColorValue | number | undefined;
}

const Icon = ({size = 24, ...props}: IconProps) => {
  const {colors} = useTheme();

  return <MIcon size={size} color={colors.primary} {...props} />;
};

export default Icon;

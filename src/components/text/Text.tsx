import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'label-md';
  weight?: 'semibold' | 'regular';
}

const Text = ({variant = 'body', weight, ...props}: TextProps) => {
  const {colors} = useTheme();

  const {h1, h2, h3, body, label, labelMd} = styles;
  const textStyle =
    variant === 'h1'
      ? h1
      : variant === 'h2'
      ? h2
      : variant === 'h3'
      ? h3
      : variant === 'body'
      ? body
      : variant === 'label'
      ? label
      : labelMd;
  const fontWeight =
    weight === 'semibold'
      ? '600'
      : weight === 'regular'
      ? '400'
      : textStyle.fontWeight;
  const fontFamily =
    weight === 'semibold'
      ? 'Inter-SemiBold'
      : weight === 'regular'
      ? 'Inter-Regular'
      : textStyle.fontFamily;

  return (
    <RNText
      {...props}
      style={[
        {
          ...textStyle,
          fontWeight,
          fontFamily,
        },
        {color: colors.text},
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  h3: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  labelMd: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
});

export default Text;

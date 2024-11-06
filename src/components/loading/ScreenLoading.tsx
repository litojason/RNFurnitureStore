import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface ScreenLoadingProps extends ActivityIndicatorProps {}

const ScreenLoading = (props: ScreenLoadingProps) => {
  const {colors} = useTheme();

  return (
    <ActivityIndicator
      animating={true}
      size="large"
      color={colors.primary}
      {...props}
    />
  );
};

export default ScreenLoading;

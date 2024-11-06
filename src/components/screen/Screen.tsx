import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  isSafeArea?: boolean;
  isBottomTabScreen?: boolean;
}

function Screen(props: ScreenProps) {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  if (props.isSafeArea) {
    return (
      <SafeAreaView
        {...props}
        style={[
          {
            flex: 1,
            height: '100%',
            backgroundColor: colors.background,
          },
          props.style,
        ]}>
        {props.children}
      </SafeAreaView>
    );
  }

  if (props.isBottomTabScreen) {
    return (
      <View
        {...props}
        style={[
          {
            flex: 1,
            height: '100%',
            backgroundColor: colors.background,
            paddingTop: insets.top,
          },
          props.style,
        ]}>
        {props.children}
      </View>
    );
  }

  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          height: '100%',
          backgroundColor: colors.background,
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
}

export default Screen;

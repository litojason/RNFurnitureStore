import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface DividerProps extends ViewProps {}

function Divider(props: DividerProps) {
  const {colors} = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          width: '100%',
          height: 1,
          backgroundColor: colors.background,
        },
        props.style,
      ]}
    />
  );
}

export default Divider;

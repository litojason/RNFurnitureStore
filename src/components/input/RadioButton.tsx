import React from 'react';
import {View, Pressable, PressableProps} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';

interface ButtonProps extends PressableProps {
  selected?: boolean;
  text: string;
}

function RadioButton({selected, text, ...props}: ButtonProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        {
          opacity: props.onPress ? (pressed ? 0.8 : 1) : 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.primary,
        }}>
        {selected && (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: colors.primary,
            }}
          />
        )}
      </View>

      {text && <Text variant="body">{text}</Text>}
    </Pressable>
  );
}

export default RadioButton;

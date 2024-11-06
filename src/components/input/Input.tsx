import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Control, Controller} from 'react-hook-form';

import {Text} from '../text';
import {Icon} from '../icon';

interface InputProps extends TextInputProps {
  control?: Control<any, any>;
  name: string;
  label?: string;
  leftIconName: string;
  hint?: string;
}

const Input = (props: InputProps) => {
  const {colors} = useTheme();

  const {control, name, label, leftIconName, hint} = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          {label && (
            <Text
              variant="label"
              style={{color: error ? colors.error : colors.text}}>
              {label}
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: props.multiline ? 'flex-start' : 'center',
              minHeight: props.multiline ? 120 : 56,
              maxHeight: props.multiline ? 240 : 0,
              paddingVertical: props.multiline ? 15 : 0,
              paddingHorizontal: 16,
              gap: 8,
              backgroundColor: colors.surface,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: error
                ? colors.error
                : value
                ? colors.primary
                : colors.surface,
            }}>
            {leftIconName && (
              <Icon
                name={leftIconName}
                color={error ? colors.error : colors.primary}
              />
            )}
            <TextInput
              placeholderTextColor={colors.placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={value}
              {...props}
              style={[
                {
                  flex: 1,
                  minHeight: props.multiline ? 120 - 16 * 2 : undefined,
                  width: '100%',
                  margin: 0,
                  padding: 0,
                  paddingTop: props.multiline ? 3 : 0,
                  color: error ? colors.error : colors.text,

                  fontSize: 16,
                  // lineHeight: 24,
                  fontFamily: 'Inter-Regular',
                },
                props.style,
              ]}
            />
          </View>
          {hint && (
            <Text variant="label" style={{color: colors.placeholder}}>
              {hint}
            </Text>
          )}
          {error && (
            <Text variant="label" style={{color: colors.error}}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default Input;

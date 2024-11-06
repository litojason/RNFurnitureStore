import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../text';
import {Button} from '../button';

type AlertButtonProps = {
  text: string | undefined;
  mode?: 'contained' | 'outlined' | 'text';
  type?: 'none' | 'destructive';
  leftIconName?: string;
  onPress?: () => void;
};

type ModalAlertProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  cancelable?: boolean;
  title: string;
  description: string;
  buttons?: AlertButtonProps[];
};

const ModalAlert = ({
  visible,
  setVisible,
  cancelable = true,
  title,
  description,
  buttons,
}: ModalAlertProps) => {
  const {colors} = useTheme();

  const handleCloseModal = () => {
    if (cancelable) setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCloseModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCloseModal}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.modalOverlay,
          padding: 16,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            padding: 16,
            gap: 32,
            backgroundColor: colors.background,
            borderRadius: 8,
          }}>
          <View>
            <Text variant="h2">{title}</Text>
            <Text>{description}</Text>
          </View>

          {buttons?.length === 1 ? (
            <Button {...buttons[0]} />
          ) : buttons ? (
            <View style={{flexDirection: 'row', gap: 16}}>
              <Button {...buttons[0]} buttonStyle={{flex: 1}} />
              <Button {...buttons[1]} buttonStyle={{flex: 1}} />
            </View>
          ) : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalAlert;

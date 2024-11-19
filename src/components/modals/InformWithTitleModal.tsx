import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '~/resources/theme';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';

export type InformTitleParams = {
  message: string;
  title: string;
};

const InformWithTitleModal = ({
  modal: {params, closeModal},
}: {
  modal: {params: InformTitleParams; closeModal: any};
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  return (
    <View
      style={[
        styles.container,
        {
          gap: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 2,
          borderColor: theme.colors.primary,
        },
      ]}>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 18,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        {params.title}
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'center',
        }}>
        {params.message}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 25,
          borderRadius: 10,
          paddingVertical: 7,
        }}
        onPress={closeModal}>
        <Text
          style={{
            color: theme.colors.text_white,
            fontSize: 18,
            fontWeight: '600',
          }}>
          {t('Close')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InformWithTitleModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.8,
  },
});

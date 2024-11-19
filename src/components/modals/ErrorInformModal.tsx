import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '~/resources/theme';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';

export type LoadingParams = {
  message: string;
};

const ErrorInformModal = ({
  modal: {params, closeModal},
}: {
  modal: {params: LoadingParams; closeModal: any};
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  return (
    <View
      style={[styles.container, {paddingHorizontal: 20, paddingVertical: 10}]}>
      <LottieView
        source={require('~/resources/animations/limited.json')}
        autoPlay
        loop
        style={{width: '100%', height: '40%'}}
      />
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 15,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 15,
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

export default ErrorInformModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const PdfScreen = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation();

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(theme.colors.bg_white);
    Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <LottieView
        source={require('../../resources/animations/lauchingSoon.json')}
        autoPlay
        loop
        style={{width: '100%', height: '35%'}}
      />
      <Text
        style={{color: theme.colors.primary, fontSize: 22, fontWeight: '700'}}>
        {t('This feature is comming soon')}
      </Text>
    </SafeAreaView>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

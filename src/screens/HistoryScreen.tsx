import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import IconBack from '~/resources/icons/IconBack';

const HistoryScreen = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation();

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(theme.colors.bg_white);
    Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <IconBack />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.text_black,
          }}>
          {t('History Screen')}
        </Text>
        <View style={{width: 20}}></View>
      </View>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../resources/animations/lauchingSoon.json')}
          autoPlay
          loop
          style={{width: 250, height: 250}}
        />
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 22,
            fontWeight: '700',
          }}>
          {t('This feature is comming soon')}
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

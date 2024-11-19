import {
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NativeImage from '~/components/ads/NativeImage';
import {useAppTheme} from '~/resources/theme';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {stateLang} from '~/redux/slices/langSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {LANG_MAP_VALUE} from './LanguageScreen';
import SettingComponent from '~/components/SettingComponent';
import {LangObjType} from './LanguageScreen';
import IconGlobal from '~/resources/icons/setting/IconGlobal';
import IconPolicy from '~/resources/icons/setting/IconPolicy';
import IconRate from '~/resources/icons/setting/IconRate';
import IconShare from '~/resources/icons/setting/IconShare';
import IconBack from '~/resources/icons/IconBack';
import {useAppSelector} from '~/hooks/useReduxStore';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';

const SettingScreenTemp = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'SettingScreenTemp'>>();
  const theme = useAppTheme();
  const lng = useAppSelector(stateLang);

  const handleOpenLanguage = () => {
    navigation.push('LanguageScreen', {nextScreen: 'SettingScreenTemp'});
  };
  const handleShareApp = () => {};
  const handleRateApp = () => {};
  const handleOpenPolicy = () => {
    Linking.openURL(
      'https://sites.google.com/view/easy-math-photo/privacy-policy',
    );
  };
  const handleGoBack = () => {
    navigation.navigate('BottomTabNavigation', {screen: 'ScanScreen'});
  };

  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#ffffff');
    Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View style={{width: '100%', paddingHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <TouchableOpacity
            style={{width: 20, alignItems: 'center'}}
            onPress={handleGoBack}>
            <IconBack />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 20,
                fontWeight: '600',
              }}>
              {t('Setting')}
            </Text>
          </View>
          <View style={{width: 20}}></View>
        </View>
        <SettingComponent
          icon={<IconGlobal />}
          title={t('Language')}
          value={t(LANG_MAP_VALUE[lng as keyof LangObjType].name)}
          onPress={handleOpenLanguage}
        />
        <SettingComponent
          icon={<IconShare />}
          title={t('Share the app')}
          onPress={handleShareApp}
        />
        <SettingComponent
          icon={<IconRate />}
          title={t('Rate')}
          onPress={handleRateApp}
        />
        <SettingComponent
          icon={<IconPolicy />}
          title={t('Privacy Policy')}
          onPress={handleOpenPolicy}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingScreenTemp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
});

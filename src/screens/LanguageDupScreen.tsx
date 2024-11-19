import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LangList, langList} from '~/data/languageData';
import {useAppTheme} from '~/resources/theme';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import NativeImage from '~/components/ads/NativeImage';
import IconCheck from '~/resources/icons/IconCheck';
import {DotIndicator} from 'react-native-indicators';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import {LangType} from '~/@types/langType';
import i18n from '~/i18n';
import {ScrollView} from 'react-native-gesture-handler';
import LanguageSelectComponent from '~/components/LanguageSelectComponent';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {setItem, getItem} from '~/utils/asyncStorage';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {setStateLang} from '~/redux/slices/langSlice';
import IconBackWhite from '~/resources/icons/IconBackWhite';
import Config from 'react-native-config';
import IconCheckWithBg from '~/resources/icons/languages/IconCheckWithBg';

export const KEY_LANG = '@key_lang';

const ID_NATIVE_LANGUAGE_DUP = Config.native_language_dup;
const ID_NATIVE_LANGUAGE_DUP_HIGH = Config.native_language_dup_high;

const LanguageDupScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'LanguageDupScreen'>>();
  const route = useRoute<RouteProp<RootParamList, 'LanguageDupScreen'>>();
  const theme = useAppTheme();
  const [langSelected, setLangSelected] = useState<LangType>(
    route.params.langSelected,
  );
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [showNativeDupHigh, setShowNativeDupHigh] = useState<boolean>(true);
  const adsRemote = useAppSelector(stateAdsRemote);
  const [errorLoadAds, setErrorLoadAds] = useState<boolean>(false);
  const [errorLoadAdsHigh, setErrorLoadAdsHigh] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [waitingHigh, setWaitingHigh] = useState<boolean>(true);
  const handleSelectLanguage = (lng: LangType) => {
    setLangSelected(lng);
  };

  const handleConfirmLanguage = () => {
    i18n.changeLanguage(langSelected);
    dispatch(setStateLang(langSelected));
    setItem(KEY_LANG, langSelected);
    if (isFirstTime) {
      navigation.navigate('OnBoardingScreen');
    } else {
      navigation.navigate('SettingScreenTemp'); //Phase 1
      // navigation.navigate('BottomTabNavigation', {screen: 'SettingScreen'});
    }
  };

  const handleGoBack = () => {
    navigation.navigate('SettingScreenTemp'); //Phase 1
    // navigation.navigate('BottomTabNavigation', {screen: 'SettingScreen'});
  };

  useEffect(() => {
    if (!adsRemote.ads_native_language_dup_high?.isOn)
      setShowNativeDupHigh(false);
  }, []);

  useEffect(() => {
    const checkIsFirstTime = async () => {
      try {
        const lang = await getItem(KEY_LANG);
        setIsFirstTime(lang ? false : true);
      } catch (error) {
        console.error('Dev defined error: ', error);
      }
    };
    checkIsFirstTime();
  }, []);

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(theme.colors.primary);
    Platform.OS === 'android' && StatusBar.setBarStyle('light-content');
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
      {/* Header */}
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        {!isFirstTime && (
          <TouchableOpacity
            style={{width: 40}}
            onPress={handleGoBack}
            disabled={waiting || waitingHigh}>
            <IconBackWhite />
          </TouchableOpacity>
        )}
        {isFirstTime && <View style={{width: 40}}></View>}
        <View>
          <Text
            style={{
              color: theme.colors.text_white,
              fontSize: 20,
              fontWeight: '600',
            }}>
            {t('Language')}
          </Text>
        </View>
        <View style={{width: 40}}>
          <TouchableOpacity
            style={{}}
            onPress={handleConfirmLanguage}
            disabled={waiting || waitingHigh}>
            <IconCheckWithBg />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scroll */}
      <View style={{flex: 1, paddingHorizontal: 40}}>
        <ScrollView>
          <View style={{paddingTop: 25}}>
            {langList.map((item: LangList, index: number) => (
              <LanguageSelectComponent
                languageObject={item}
                languageSelected={langSelected}
                onSelectLanguage={handleSelectLanguage}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Ads Native Image */}
      {adsRemote.ads_native_language_high?.isOn && !errorLoadAdsHigh && (
        <View
          style={
            showNativeDupHigh
              ? {width: '100%'}
              : {position: 'absolute', zIndex: -10}
          }>
          <NativeImage
            adId={ID_NATIVE_LANGUAGE_DUP_HIGH}
            setAdsHigh={setShowNativeDupHigh}
            setAdsLoadError={setErrorLoadAdsHigh}
            setWaitAds={setWaitingHigh}
          />
        </View>
      )}

      {adsRemote.ads_native_language?.isOn && !errorLoadAds && (
        <View
          style={
            showNativeDupHigh
              ? {position: 'absolute', zIndex: -10}
              : {width: '100%'}
          }>
          <NativeImage
            adId={ID_NATIVE_LANGUAGE_DUP}
            setAdsLoadError={setErrorLoadAds}
            setWaitAds={setWaiting}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: theme.colors.bg_white,
          width: '100%',
          height: '100%',
          zIndex: -5,
        }}></View>
    </SafeAreaView>
  );
};

export default LanguageDupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
import {LangType} from '~/@types/langType';
import i18n from '~/i18n';
import {ScrollView} from 'react-native-gesture-handler';
import LanguageSelectComponent from '~/components/LanguageSelectComponent';
import Config from 'react-native-config';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {useRoute} from '@react-navigation/native';
import {setItem, getItem} from '~/utils/asyncStorage';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {setStateLang} from '~/redux/slices/langSlice';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import IconEnglish from '~/resources/icons/languages/IconEnglish';
import IconSpanish from '~/resources/icons/languages/IconSpanish';
import IconGermany from '~/resources/icons/languages/IconGermany';
import IconIndonesian from '~/resources/icons/languages/IconIndonesian';
import IconJapanese from '~/resources/icons/languages/IconJapanese';
import IconKorean from '~/resources/icons/languages/IconKorean';
import IconPortuguese from '~/resources/icons/languages/IconPortuguese';
import IconHindi from '~/resources/icons/languages/IconHindi';
import IconBackWhite from '~/resources/icons/IconBackWhite';
import {useModal} from 'react-native-modalfy';
import IconCheckWithBg from '~/resources/icons/languages/IconCheckWithBg';

export const KEY_LANG = '@key_lang';

type LangItem = {
  name: string;
  flag: JSX.Element;
};

export type LangObjType = {
  en: LangItem;
  es: LangItem;
  de: LangItem;
  id: LangItem;
  ja: LangItem;
  ko: LangItem;
  pt: LangItem;
  hi: LangItem;
};

export const LANG_MAP_VALUE: LangObjType = {
  en: {name: 'English', flag: <IconEnglish />},
  es: {name: 'Spanish', flag: <IconSpanish />},
  de: {name: 'Germany', flag: <IconGermany />},
  id: {name: 'Indonesian', flag: <IconIndonesian />},
  ja: {name: 'Japanese', flag: <IconJapanese />},
  ko: {name: 'Korean', flag: <IconKorean />},
  pt: {name: 'Portuguese', flag: <IconPortuguese />},
  hi: {name: 'Hindi', flag: <IconHindi />},
};

const LanguageScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'LanguageScreen'>>();
  const route = useRoute<RouteProp<RootParamList, 'LanguageScreen'>>();
  const nextScreen = route.params.nextScreen;
  const theme = useAppTheme();
  const [langSelected, setLangSelected] = useState<LangType>('');
  const adsRemote = useAppSelector(stateAdsRemote);
  const ID_NATIVE_LANGUAGE = __DEV__
    ? undefined
    : adsRemote.ads_native_language.id;
  const ID_NATIVE_LANGUAGE_HIGH = __DEV__
    ? undefined
    : adsRemote.ads_native_language_high.id;
  const [waiting, setWaiting] = useState<boolean>(
    adsRemote.ads_native_language.isOn,
  );
  const [waitingHigh, setWaitingHigh] = useState<boolean>(
    adsRemote.ads_native_language_high.isOn,
  );
  const [showNativeHigh, setShowNativeHigh] = useState<boolean>(true);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const {openModal, closeModals} = useModal();
  const [errorLoadAds, setErrorLoadAds] = useState<boolean>(false);
  const [errorLoadAdsHigh, setErrorLoadAdsHigh] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelectLanguage = (lng: LangType) => {
    navigation.push('LanguageDupScreen', {langSelected: lng});
  };

  const handleConfirmLanguage = () => {
    if (langSelected == '') {
      openModal('InformWithTitleModal', {
        message: t('Sorry, you have to choose a language to continue!'),
        title: t('Opss!!!'),
      });
    } else {
      if (!waiting && !waitingHigh) {
        i18n.changeLanguage(langSelected);
        dispatch(setStateLang(langSelected));
        setItem(KEY_LANG, langSelected);
        navigation.navigate('SettingScreenTemp');
      }
    }
  };

  const handleGoBack = () => {
    navigation.navigate('SettingScreenTemp'); //Phase 1
    // navigation.navigate('BottomTabNavigation', {screen: 'SettingScreen'});
  };

  useEffect(() => {
    //Get item with key KEY_LANG from async storage
    getItem(KEY_LANG).then(lang => {
      if (lang) {
        setLangSelected(lang);
      }
    });
  }, []);

  useEffect(() => {
    if (!adsRemote.ads_native_language_high?.isOn) setShowNativeHigh(false);
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
      const checkIsFirstTime = async () => {
        try {
          const lang = await getItem(KEY_LANG);
          setIsFirstTime(lang ? false : true);
        } catch (error) {
          console.error('Dev defined error: ', error);
        }
      };
      checkIsFirstTime();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
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
          <TouchableOpacity style={{}} onPress={handleConfirmLanguage}>
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
                // isDisabled={waiting || waitingHigh}
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
            showNativeHigh
              ? {width: '100%'}
              : {position: 'absolute', zIndex: -10}
          }>
          <NativeImage
            adId={ID_NATIVE_LANGUAGE_HIGH}
            setAdsHigh={setShowNativeHigh}
            setAdsLoadError={setErrorLoadAdsHigh}
            setWaitAds={setWaitingHigh}
          />
        </View>
      )}

      {adsRemote.ads_native_language?.isOn && !errorLoadAds && (
        <View
          style={
            showNativeHigh
              ? {position: 'absolute', zIndex: -10}
              : {width: '100%'}
          }>
          <NativeImage
            adId={ID_NATIVE_LANGUAGE}
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

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

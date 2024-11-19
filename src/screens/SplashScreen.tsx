import {
  AppState,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {
  TestIds,
  useInterstitialAd,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import Config from 'react-native-config';
import * as Progress from 'react-native-progress';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {getItem} from '~/utils/asyncStorage';
import {KEY_LANG} from './LanguageScreen';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {setStateLang} from '~/redux/slices/langSlice';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import {
  setStateAdsRemote,
  t_AdsRemote,
  t_AdsRemoteState,
} from '~/redux/slices/remoteAdsSlice';
import i18n from '~/i18n';
import remoteConfig from '@react-native-firebase/remote-config';
import {
  AdsConsent,
  AdsConsentStatus,
  MobileAds,
} from 'react-native-google-mobile-ads';

const REMOTE_PREFIX_ADS = 'ads_';

const ID_INTER_SPLASH = Config.inter_splash;
const ID_INTER_SPLASH_HIGH = Config.inter_splash_high;
const ID_BANNER_SPLASH = Config.banner_splash;

const DEFAULT_ADS_STATE = {
  ads_app_open_resume: JSON.stringify({
    isOn: false,
    id: Config.app_open_resume,
  }),
  ads_inter_splash: JSON.stringify({
    isOn: false,
    id: Config.inter_splash,
  }),
  ads_inter_splash_high: JSON.stringify({
    isOn: false,
    id: Config.inter_splash_high,
  }),
  ads_banner_splash: JSON.stringify({
    isOn: false,
    id: Config.banner_splash,
  }),
  ads_native_onboarding: JSON.stringify({
    isOn: false,
    id: Config.native_onboarding,
  }),
  ads_native_language: JSON.stringify({
    isOn: false,
    id: Config.native_language,
  }),
  ads_native_language_high: JSON.stringify({
    isOn: false,
    id: Config.native_language_high,
  }),
  ads_native_language_dup: JSON.stringify({
    isOn: false,
    id: Config.native_language_dup,
  }),
  ads_native_language_dup_high: JSON.stringify({
    isOn: false,
    id: Config.native_language_dup_high,
  }),
  ads_banner_others: JSON.stringify({
    isOn: false,
    id: Config.banner_others,
  }),
  ads_banner_home: JSON.stringify({
    isOn: false,
    id: Config.banner_home,
  }),
  ads_native_onboarding_full_screen: JSON.stringify({
    isOn: false,
    id: Config.native_onboarding_full_screen,
  }),
};

const SplashScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'SplashScreen'>>();
  const interSplash = useInterstitialAd(ID_INTER_SPLASH);
  const interSplashHigh = useInterstitialAd(ID_INTER_SPLASH_HIGH);
  const adsRemote = useAppSelector(stateAdsRemote);
  const [waitingAds, setWaitingAds] = useState<boolean>(false);

  const checkConsent = async (): Promise<boolean> => {
    const consentInfo = await AdsConsent.requestInfoUpdate();
    //Return true if non EU registration
    if (!consentInfo.isConsentFormAvailable) return true;

    // Check if user requires consent
    if (consentInfo.status === AdsConsentStatus.OBTAINED) return true;
    if (
      consentInfo.status === AdsConsentStatus.UNKNOWN ||
      consentInfo.status === AdsConsentStatus.REQUIRED
    ) {
      // Show a Google-rendered form
      const formResult = await AdsConsent.showForm();
      if (formResult.status === AdsConsentStatus.OBTAINED) return true;
    }
    return false;
  };

  const loadScreen = async () => {
    try {
      const lng = await getItem(KEY_LANG);
      if (lng) {
        //Da chay tren 1 lan
        i18n.changeLanguage(lng);
        dispatch(setStateLang(lng));
        navigation.navigate('BottomTabNavigation', {screen: 'ScanScreen'});
      } else {
        //Chay lan dau
        navigation.navigate('LanguageScreen', {
          nextScreen: 'OnBoardingScreen',
        });
      }
    } catch (error) {
      console.error('Dev defined error: ', error);
    }
  };

  useEffect(() => {
    setWaitingAds(adsRemote.ads_banner_splash.isOn);
  }, [adsRemote]);

  useEffect(() => {
    //Show high ads
    if (interSplashHigh.isLoaded && AppState.currentState == 'active') {
      dispatch(setStateAdsOpen(false));
      console.log('High ads show');
      interSplashHigh.show();
    }
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && interSplashHigh.isLoaded) {
        dispatch(setStateAdsOpen(false));
        console.log('High ads show when open back');
        interSplashHigh.show();
      }
    });
    return () => {
      // Clean up the subscription
      subscription.remove();
    };
  }, [interSplashHigh.isLoaded]);

  useEffect(() => {
    if (
      (interSplashHigh.error || !adsRemote.ads_inter_splash_high?.isOn) &&
      interSplash.isLoaded
    ) {
      dispatch(setStateAdsOpen(false));
      console.log('Normal ads show');
      interSplash.show();
    }
    if (
      interSplashHigh.error &&
      (!adsRemote.ads_inter_splash?.isOn || interSplash.error) &&
      !waitingAds
    ) {
      loadScreen();
    }
    //bat truowng hop user out app to bg
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'active' &&
        (interSplashHigh.error || !adsRemote.ads_inter_splash_high?.isOn) &&
        interSplash.isLoaded
      ) {
        dispatch(setStateAdsOpen(false));
        console.log('Normal ads show  when open back');
        interSplash.show();
      }
    });
    return () => {
      // Clean up the subscription
      subscription.remove();
    };
  }, [interSplashHigh.error, interSplash.isLoaded, interSplash.error]);

  useEffect(() => {
    if ((interSplashHigh.isClosed || interSplash.isClosed) && !waitingAds) {
      loadScreen();
    }
  }, [interSplashHigh.isClosed, interSplash.isClosed]);

  /** Fetch data from firebase Store */
  useEffect(() => {
    const loadApp = async () => {
      const isConsent = await checkConsent();
      isConsent && (await MobileAds().initialize());
      remoteConfig()
        .setDefaults(DEFAULT_ADS_STATE)
        .then(() => {
          console.log('Default values set.');
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(() => {
          const values = remoteConfig().getAll();
          const tmpRemote: t_AdsRemoteState = {
            ads_inter_splash: {isOn: false, id: ''},
            ads_inter_splash_high: {isOn: false, id: ''},
            ads_banner_splash: {isOn: false, id: ''},
            ads_native_onboarding: {isOn: false, id: ''},
            ads_native_language: {isOn: false, id: ''},
            ads_native_language_high: {isOn: false, id: ''},
            ads_native_language_dup: {isOn: false, id: ''},
            ads_native_language_dup_high: {isOn: false, id: ''},
            ads_app_open_resume: {isOn: false, id: ''},
            ads_banner_home: {isOn: false, id: ''},
            ads_banner_others: {isOn: false, id: ''},
            ads_native_onboarding_full_screen: {isOn: false, id: ''},
          };
          Object.entries(values).forEach($ => {
            const [key, entry] = $;
            //Check for ads prefixed
            if (key.startsWith(REMOTE_PREFIX_ADS)) {
              const adsRemote: t_AdsRemote = JSON.parse(entry.asString());
              isConsent
                ? (tmpRemote[key as keyof t_AdsRemoteState] = adsRemote)
                : (tmpRemote[key as keyof t_AdsRemoteState] = {
                    ...adsRemote,
                    isOn: false,
                  });
              dispatch(setStateAdsRemote(tmpRemote));
            }
          });
          //Case turn off ads banner splash
          tmpRemote.ads_inter_splash_high.isOn && interSplashHigh.load();
          tmpRemote.ads_inter_splash.isOn && interSplash.load();
          !tmpRemote.ads_inter_splash_high.isOn &&
            !tmpRemote.ads_inter_splash.isOn &&
            !tmpRemote.ads_banner_splash.isOn &&
            loadScreen();
        })
        .catch(() => {
          console.error('Something went wrongs when fetch remote config!');
          loadScreen();
        });
    };
    loadApp();
  }, [interSplashHigh.load, interSplash.load]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View
        style={{
          flex: 0.85,
          justifyContent: 'center',
        }}>
        <View style={[styles.itemContainer]}>
          <View style={{}}>
            <Image
              resizeMode="contain"
              source={require('~/resources/images/appIcon.png')}
              style={{width: SCREEN_WIDTH / 2.5, aspectRatio: 1}}
            />
          </View>
        </View>
      </View>
      {/** Loading ads */}
      <View style={{flex: 0.15, justifyContent: 'space-between'}}>
        <View style={[styles.itemContainer]}>
          <Progress.Bar
            progress={0.5}
            width={200}
            height={10}
            indeterminate={true}
            color={theme.colors.primary}
            borderRadius={10}
          />
        </View>
        <View style={[styles.itemContainer]}>
          <Text style={{color: theme.colors.primary}}>
            {t('This action may contain ads')}
          </Text>
        </View>
        {adsRemote.ads_banner_splash.isOn ? (
          <BannerAd
            unitId={ID_BANNER_SPLASH}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            onAdFailedToLoad={() => setWaitingAds(false)}
            onAdLoaded={() => setWaitingAds(false)}
          />
        ) : (
          <View style={{height: 100}}></View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {width: '100%', alignItems: 'center'},
});

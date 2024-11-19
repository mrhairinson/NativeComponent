import {
  Animated,
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAppTheme} from '~/resources/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import Swiper from 'react-native-swiper';
import NativeImage from '~/components/ads/NativeImage';
import {onBoadingList} from '~/data/onBoardingData';
import OnBoardingComponent from '~/components/OnBoardingComponent';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useModal} from 'react-native-modalfy';
import Config from 'react-native-config';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import {useAppSelector} from '~/hooks/useReduxStore';
import {stateLang} from '~/redux/slices/langSlice';
import IconBack from '~/resources/icons/IconBack';
import NativeFull from '~/components/ads/NativeFull';

type t_Dot = {id: number};

const ID_NATIVE_ONBOARDING = Config.native_onboarding;
const ID_NATIVE_FULL = Config.native_onboarding_full_screen;

const OnBoardingScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'OnBoardingScreen'>>();
  const theme = useAppTheme();
  const scrollX = useRef(new Animated.Value(0)).current; //Animate for scrolling
  const {width: windowWidth} = useWindowDimensions(); //Animate for scrolling
  const swiper = useRef<Swiper>(null);
  const [indexOb, setIndexOb] = useState<number>(0);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [waitingFull, setWaitingFull] = useState<boolean>(true);
  const [showNativeFull, setShowNativeFull] = useState<boolean>(false);
  const [errorLoadAds, setErrorLoadAds] = useState<boolean>(false);
  const [errorLoadAdsFull, setErrorLoadAdsFull] = useState<boolean>(false);
  const adsRemote = useAppSelector(stateAdsRemote);
  // const [dotData, setDotData] = useState<t_Dot[]>([
  //   {id: 0},
  //   {id: 1},
  //   {id: 2},
  //   {id: 3},
  // ]);
  const dotData = adsRemote.ads_native_onboarding_full_screen?.isOn
    ? [{id: 0}, {id: 1}, {id: 2}, {id: 3}]
    : [{id: 0}, {id: 1}, {id: 2}];
  const [overlay, setOverlay] = useState<boolean>(false);
  const {openModal, closeModals} = useModal();
  const lng = useAppSelector(stateLang);
  const translate = [
    t('AI-powered Solutions at Your Fingertips'),
    t('Explore a wide range of solutions'),
    t('Work with A Smart Calculator'),
    t('Efficient and precise calculations'),
    t('Scan & Solve Problems'),
    t('Provides quick and easy results'),
  ];

  // useEffect(() => {
  //   console.log('ad full', adsRemote.ads_native_onboarding_full_screen);
  //   adsRemote.ads_native_onboarding_full_screen?.isOn &&
  //     setDotData([{id: 0}, {id: 1}, {id: 2}, {id: 3}]);
  // }, []);

  const handlePressNextButton = () => {
    if (indexOb === dotData.length - 1) {
      //Navigation to select language screen at the last onboarding
      handleGotoHome();
    } else {
      //Moving next onboarding
      let newIndex = indexOb + 1;
      if (adsRemote.ads_native_onboarding_full_screen?.isOn) {
        swiper.current?.scrollBy(newIndex == 2 ? indexOb : newIndex);
      } else {
        swiper.current?.scrollBy(newIndex);
      }
      handleOnIndexChange(newIndex);
    }
  };

  const handlePressBackButton = () => {
    navigation.navigate('LanguageDupScreen', {langSelected: lng});
  };

  const handleGotoHome = () => {
    openModal('LoadingModal', {
      message: t('Hang on! We are setting up for you'),
    });
    setOverlay(true);
    //Clear onboarding content
    setTimeout(() => {
      closeModals('LoadingModal');
      navigation.navigate('BottomTabNavigation', {screen: 'ScanScreen'});
    }, 2500);
  };

  const handleOnIndexChange = (item: number) => {
    setErrorLoadAds(false);
    setWaiting(true);
    setIndexOb(item);
  };

  useEffect(() => {
    if (errorLoadAdsFull) {
      handlePressNextButton();
      setErrorLoadAdsFull(false);
    }
  }, [errorLoadAdsFull]);

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
      {overlay ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.bg_white,
          }}></View>
      ) : (
        <>
          {/* Header */}
          {((indexOb !== 2 && adsRemote.ads_native_onboarding_full_screen?.isOn) ||
            !adsRemote.ads_native_onboarding_full_screen?.isOn) && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.colors.bg_white,
                paddingHorizontal: 30,
                paddingTop: 20,
              }}>
              <TouchableOpacity
                disabled={waiting}
                style={{paddingHorizontal: 5}}
                onPress={handlePressBackButton}>
                <IconBack colors={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={waiting}
                onPress={handleGotoHome}
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 100,
                  backgroundColor: theme.colors.primary,
                }}>
                <Text
                  style={{
                    color: theme.colors.text_white,
                    fontWeight: '600',
                    fontSize: 15,
                    lineHeight: 27,
                  }}>
                  {t('Skip')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Swiper */}
          <View style={{flex: 1, backgroundColor: theme.colors.bg_white}}>
            <Swiper
              scrollEnabled={!waiting}
              showsButtons={false}
              loop={false}
              ref={swiper}
              showsPagination={false}
              onIndexChanged={index => {
                handleOnIndexChange(index);
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: scrollX,
                      },
                    },
                  },
                ],
                {useNativeDriver: false},
              )}
              autoplay={false}
              removeClippedSubviews={true}
              key={adsRemote.ads_native_onboarding_full_screen?.isOn ? 4 : 3}>
              <View
                style={{
                  flex: 1,
                  paddingBottom: SCREEN_WIDTH > 400 ? 45 : 20,
                }}>
                <OnBoardingComponent
                  title={t(onBoadingList[0].title)}
                  image={onBoadingList[0].image}
                  subTitle={t(onBoadingList[0].subTitle)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingBottom: SCREEN_WIDTH > 400 ? 45 : 20,
                }}>
                <OnBoardingComponent
                  title={t(onBoadingList[1].title)}
                  image={onBoadingList[1].image}
                  subTitle={t(onBoadingList[1].subTitle)}
                />
              </View>
              {adsRemote.ads_native_onboarding_full_screen?.isOn && (
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                  ]}>
                  {indexOb === 2 && (
                    <NativeFull
                      adId={ID_NATIVE_FULL}
                      setWaitAds={setWaiting}
                      setAdsLoadError={setErrorLoadAdsFull}
                    />
                  )}
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  paddingBottom: SCREEN_WIDTH > 400 ? 45 : 20,
                }}>
                <OnBoardingComponent
                  title={t(onBoadingList[3].title)}
                  image={onBoadingList[3].image}
                  subTitle={t(onBoadingList[3].subTitle)}
                />
              </View>
            </Swiper>
          </View>
          {/* Dot */}
          {((indexOb !== 2 && adsRemote.ads_native_onboarding_full_screen?.isOn) ||
            !adsRemote.ads_native_onboarding_full_screen?.isOn) && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                gap: 15,
                backgroundColor: theme.colors.bg_white,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 16,
                }}>
                {dotData.map((item, index) => {
                  const width = scrollX.interpolate({
                    inputRange: [
                      windowWidth * (item.id - 1),
                      windowWidth * item.id,
                      windowWidth * (item.id + 1),
                    ],
                    outputRange: [6, 16, 6],
                    extrapolate: 'clamp',
                  });
                  const backgroundColor = scrollX.interpolate({
                    inputRange: [
                      windowWidth * (item.id - 1),
                      windowWidth * item.id,
                      windowWidth * (item.id + 1),
                    ],
                    outputRange: ['#D9D9D9', theme.colors.primary, '#D9D9D9'],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={[styles.normalDot, {width, backgroundColor}]}
                    />
                  );
                })}
              </View>
            </View>
          )}
          {/* Next button */}
          {((indexOb !== 2 && adsRemote.ads_native_onboarding_full_screen?.isOn) ||
            !adsRemote.ads_native_onboarding_full_screen?.isOn) && (
            <View
              style={{
                width: '100%',
                paddingHorizontal: 30,
                paddingVertical: SCREEN_WIDTH > 400 ? 30 : 15,
                backgroundColor: theme.colors.bg_white,
              }}>
              <TouchableOpacity
                disabled={waiting}
                onPress={handlePressNextButton}
                style={[
                  {
                    backgroundColor: theme.colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingVertical: 12,
                  },
                ]}>
                <Text
                  style={{
                    color: theme.colors.text_white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {indexOb == dotData.length - 1 ? t('Get Started') : t('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Ads */}
          {adsRemote.ads_native_onboarding?.isOn && !errorLoadAds && (
            <View>
              {indexOb === 0 && (
                <NativeImage
                  adId={ID_NATIVE_ONBOARDING}
                  setAdsLoadError={setErrorLoadAds}
                  setWaitAds={setWaiting}
                />
              )}
              {indexOb === 1 && (
                <NativeImage
                  adId={ID_NATIVE_ONBOARDING}
                  setAdsLoadError={setErrorLoadAds}
                  setWaitAds={setWaiting}
                />
              )}
              {indexOb === dotData.length - 1 && (
                <NativeImage
                  adId={ID_NATIVE_ONBOARDING}
                  setAdsLoadError={setErrorLoadAds}
                  setWaitAds={setWaiting}
                />
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    position: 'relative',
  },
  normalDot: {
    width: 9,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginLeft: 4,
  },
});

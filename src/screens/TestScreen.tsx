import {
  Button,
  findNodeHandle,
  PixelRatio,
  requireNativeComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector, useAppDispatch} from '~/hooks/useReduxStore';
import {stateCount, setStateCount} from '~/redux/slices/counterSlice';
import Config from 'react-native-config';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
  useRewardedAd,
} from 'react-native-google-mobile-ads';
import NativeImage from '~/components/ads/NativeImage';
import {ScrollView} from 'react-native-gesture-handler';
import {BallIndicator} from 'react-native-indicators';
import i18n from '~/i18n';
import {useTranslation} from 'react-i18next';
import {LangType} from '~/@types/langType';
import NativeBanner from '~/components/ads/NativeBanner';
import NativeVideo from '~/components/ads/NativeVideo';
import {useAppTheme} from '~/resources/theme';
import {useModal} from 'react-native-modalfy';
import {MyViewManager} from '~/components/MyViewManager';
// import crashlytics from '@react-native-firebase/crashlytics';

enum e_AdsFullScreenType {
  NONE,
  INTER,
  REWARD,
  APP_OPEN,
}

enum e_AdsComponentType {
  BANNER,
  NATIVE_BANNER,
  NATIVE_IMAGE,
  NATIVE_VIDEO,
}

type NativeAdsFragmentProps = {
  adId: string;
  style?: object;
};

const NativeAdsFragment =
  requireNativeComponent<NativeAdsFragmentProps>('NativeAdsFragment');

const TestScreen = () => {
  const createFragment = (viewId: any) =>
    UIManager.dispatchViewManagerCommand(
      viewId,
      // we are calling the 'create' command
      '1',
      [viewId],
    );

  const ref = useRef(null);
  const adsRef = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    // const adsViewId = findNodeHandle(adsRef.current);
    createFragment(viewId);
    // createFragment(adsViewId);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{backgroundColor: 'red', height: 200, width: 200}}></View>
      <MyViewManager
        ref={ref}
        style={{
          // converts dpi to px, provide desired height
          height: PixelRatio.getPixelSizeForLayoutSize(200),
          // converts dpi to px, provide desired width
          width: PixelRatio.getPixelSizeForLayoutSize(200),
        }}
      />
      {/* <NativeAdsFragment
        ref={adsRef}
        adId="ca-app-pub-3940256099942544/2247696110"
        style={styles.nativeAd}
      /> */}
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nativeAd: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
});

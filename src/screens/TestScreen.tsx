import React, {useEffect, useRef} from 'react';
import {
  findNodeHandle,
  requireNativeComponent,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const NativeAdsFragment = requireNativeComponent<NativeAdsFragmentProps>(
  'NativeAdsFragmentManager',
);

const TestScreen = () => {
  const createFragment = (viewId: any) =>
    UIManager.dispatchViewManagerCommand(
      viewId,
      // we are calling the 'create' command
      '1',
      [viewId],
    );

  const loadAds = (viewId: any) =>
    UIManager.dispatchViewManagerCommand(
      viewId,
      // we are calling the 'create' command
      '2',
      [viewId],
    );

  const ref = useRef(null);
  const adsRef = useRef(null);

  useEffect(() => {
    // const viewId = findNodeHandle(ref.current);
    const adsViewId = findNodeHandle(adsRef.current);
    // createFragment(viewId);
    createFragment(adsViewId);

    setTimeout(() => {
      loadAds(adsViewId);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {borderWidth: 1, borderColor: 'red'}]}>
      <View style={{backgroundColor: 'red', height: 100, width: 100}}></View>
      {/* <MyViewManager
        ref={ref}
        style={{
          // converts dpi to px, provide desired height
          height: PixelRatio.getPixelSizeForLayoutSize(200),
          // converts dpi to px, provide desired width
          width: PixelRatio.getPixelSizeForLayoutSize(200),
        }}
      /> */}
      <NativeAdsFragment
        ref={adsRef}
        adId="ca-app-pub-3940256099942544/2247696110"
        style={styles.nativeAd}
      />
      {/* <NativeAdsFragment
        ref={adsRef}
        style={{
          // converts dpi to px, provide desired height
          height: PixelRatio.getPixelSizeForLayoutSize(200),
          // converts dpi to px, provide desired width
          width: PixelRatio.getPixelSizeForLayoutSize(200),
        }}
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
    height: 200,
    width: 200,
    backgroundColor: 'red',
  },
});

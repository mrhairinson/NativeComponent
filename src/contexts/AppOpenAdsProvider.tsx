import {AppState, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {AdEventType, AppOpenAd, TestIds} from 'react-native-google-mobile-ads';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {stateAdsOpen, setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';

let appOpenAd: AppOpenAd;
let isAppOpenAdLoaded = false;

const ID_APP_OPEN_ADS = __DEV__ ? TestIds.APP_OPEN : Config.app_open_resume;

const AppOpenAdsProvider = () => {
  const dispatch = useAppDispatch();
  const adsOpen = useAppSelector(stateAdsOpen);
  const adsRemote = useAppSelector(stateAdsRemote);
  const [showBg, setShowBg] = useState<boolean>(false);

  const loadAppOpenAd = () => {
    appOpenAd = AppOpenAd.createForAdRequest(ID_APP_OPEN_ADS, {
      requestNonPersonalizedAdsOnly: true,
    });
    appOpenAd.load();
    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      isAppOpenAdLoaded = true;
    });
    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      setShowBg(false);
      loadAppOpenAd();
    });
  };

  const showAppOpenAd = () => {
    if (isAppOpenAdLoaded) {
      setShowBg(true);
      appOpenAd.show();
      isAppOpenAdLoaded = false; // Reset the flag after showing the ad
    }
  };

  useEffect(() => {
    !isAppOpenAdLoaded &&
      adsRemote.ads_app_open_resume?.isOn &&
      loadAppOpenAd();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.log("Ads open:", adsOpen);
        console.log("Remote Ads open:", adsRemote.ads_app_open_resume?.isOn);
        // Show the ad when the app is brought back to the foreground
        adsOpen && adsRemote.ads_app_open_resume?.isOn && showAppOpenAd();
        dispatch(setStateAdsOpen(true));
      }
    });
    return () => {
      // Clean up the subscription
      subscription.remove();
    };
  }, [adsOpen]);
  return (
    <>
      {showBg ? (
        <SafeAreaView
          style={{
            // ...StyleSheet.absoluteFillObject,
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            // flex: 1,
            backgroundColor: "#FFFFFF",
          }}></SafeAreaView>
      ) : null}
    </>
  );
};

export default AppOpenAdsProvider;

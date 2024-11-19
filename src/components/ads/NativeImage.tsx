import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, Platform, Text, View} from 'react-native';
import NativeAdView, {
  AdManager,
  CallToActionView,
  HeadlineView,
  IconView,
  ImageView,
  NativeMediaView,
  TaglineView,
  TestIds,
} from 'react-native-admob-native-ads';
import ShimmerPlaceholder from '../loading/ShimmerPlaceholder';
import {useAppTheme} from '~/resources/theme';
import {useFocusEffect} from '@react-navigation/native';

const NativeImage = React.memo(
  ({
    adId,
    setAdsHigh,
    setAdsLoadError,
    setWaitAds,
  }: {
    adId?: string;
    setAdsHigh?: React.Dispatch<React.SetStateAction<boolean>>;
    setAdsLoadError?: React.Dispatch<React.SetStateAction<boolean>>;
    setWaitAds?: React.Dispatch<React.SetStateAction<boolean>>;
  }): JSX.Element => {
    const theme = useAppTheme();
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [ads, setAds] = useState<any>();
    const nativeAdRef = useRef<NativeAdView>(null);
    const adMediaId = adId ?? TestIds.Image;

    AdManager.registerRepository({
      name: 'ads',
      adUnitId: adMediaId,
      numOfAds: 1,
      expirationPeriod: 4000,
      mediationEnabled: true,
      mediaAspectRatio: 'landscape',
    }).then(result => {
      console.log('Registered: ', result);
    });

    const onAdFailedToLoad = (event: any) => {
      setError(true);
      setLoading(false);
      setWaitAds && setWaitAds(false);
      setAdsHigh && setAdsHigh(false);
      setAdsLoadError && setAdsLoadError(true);
      console.log('AD', 'FAILED', event);
    };

    const onAdLoaded = () => {
      setWaitAds && setWaitAds(false);
      console.log('AD', 'LOADED', 'Ad has loaded successfully');
    };

    const onAdClicked = () => {
      console.log('AD', 'CLICK', 'User has clicked the Ad');
    };

    const onAdImpression = () => {
      console.log('AD', 'IMPRESSION', 'Ad impression recorded');
      setWaitAds && setWaitAds(false);
    };

    const onNativeAdLoaded = (event: any) => {
      console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
      setAds(event);
      setLoading(false);
      setLoaded(true);
      setError(false);
    };

    const onAdLeftApplication = () => {
      console.log('AD', 'LEFT', 'Ad left application');
    };

    useEffect(() => {
      if (!loaded) {
        nativeAdRef.current?.loadAd();
      } else {
        console.log('AD', 'LOADED ALREADY');
      }
    }, [loaded]);

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
      <NativeAdView
        ref={nativeAdRef}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={onAdFailedToLoad}
        onAdLeftApplication={onAdLeftApplication}
        onAdClicked={onAdClicked}
        onAdImpression={onAdImpression}
        onNativeAdLoaded={onNativeAdLoaded}
        enableSwipeGestureOptions={{tapsAllowed: true}}
        refreshInterval={60000}
        style={{
          width: '100%',
        }}
        adUnitID={adMediaId}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
          }}>
          {/** Absolute parts */}

          {/** Shimmer place holder and error */}
          {!loading && (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: !loading && !error && loaded ? 0 : 1,
              }}>
              <ShimmerPlaceholder
                width={Dimensions.get('window').width}
                height="100%"
                style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
              />
            </View>
          )}
          {error && <Text style={{color: '#a9a9a9'}}>:-(</Text>}
          <View
            style={{
              paddingHorizontal: 28,
              width: '100%',
              paddingTop: 15,
              paddingBottom: 8,
              gap: 6,
              position: 'relative',
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: theme.colors.primary,
                padding: 3,
                paddingHorizontal: 5,
              }}>
              <Text style={{color: '#FFF', fontSize: 9}}>AD</Text>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                opacity: loading || error || !loaded ? 0 : 1,
              }}>
              <IconView
                style={{
                  width: 40,
                  height: 40,
                }}
              />

              <View
                style={{
                  paddingHorizontal: 12,
                  flexShrink: 1,
                }}>
                <HeadlineView
                  style={{
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: 4,
                    fontSize: 12,
                  }}
                />
                <TaglineView
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    color: '#000',
                  }}
                />
              </View>
            </View>
            {ads?.video ? (
              <NativeMediaView
                style={{
                  width: '100%',
                  height: 140,
                  borderRadius: 8,
                }}
              />
            ) : (
              ads?.images.length > 0 && (
                <ImageView
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 140,
                    borderRadius: 8,
                  }}
                />
              )
            )}
            {ads?.images?.length == 0 && !ads?.video && (
              <View
                style={{
                  width: '100%',
                  height: 140,
                  backgroundColor: theme.colors.bg_white,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconView style={{width: 90, height: 90}} />
              </View>
            )}

            {/* <Text
              style={{
                fontSize: 14,
                color: '#000',
              }}>{`Number of image return: ${ads?.images.length}`}</Text>
            <Text
              style={{
                fontSize: 9,
                color: '#000',
              }}>
              {JSON.stringify(ads)}
            </Text> */}

            {loaded && (
              <CallToActionView
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 10,
                    height: 40,
                    width: '100%',
                  },
                  Platform.OS === 'ios'
                    ? {
                        backgroundColor: theme.colors.primary,
                        borderRadius: 10,
                      }
                    : {},
                ]}
                buttonAndroidStyle={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 10,
                }}
                allCaps
                textStyle={{
                  fontSize: 16,
                  fontWeight: '500',
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  color: 'white',
                }}
              />
            )}
          </View>
        </View>
      </NativeAdView>
    );
  },
);
export default NativeImage;

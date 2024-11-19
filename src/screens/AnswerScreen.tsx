import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useAppTheme} from '~/resources/theme';
import {useAppDispatch} from '~/hooks/useReduxStore';
import {setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import NativeBanner from '~/components/ads/NativeBanner';
import IconBack from '~/resources/icons/IconBack';
import IconPremium from '~/resources/icons/IconPremium';
import {ScrollView} from 'react-native-gesture-handler';
import ResultComponent from '~/components/ResultComponent';
import IconShare from '~/resources/icons/IconShare';
import IconRateAngry from '~/resources/icons/rating/IconRateAngry';
import IconRateHappy from '~/resources/icons/rating/IconRateHappy';
import IconRateLove from '~/resources/icons/rating/IconRateLove';
import IconRateSad from '~/resources/icons/rating/IconRateSad';
import IconRateWow from '~/resources/icons/rating/IconRateWow';
import IconRightArrow from '~/resources/icons/setting/IconRightArrow';
import useInAppReview from '~/hooks/useInAppReview';
import {useAppSelector} from '~/hooks/useReduxStore';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import Config from 'react-native-config';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {NO_INFO} from '~/data/errorCode';

const ID_BANNER_OTHERS = __DEV__ ? TestIds.BANNER : Config.banner_others;

enum eRating {
  SAD = 1,
  ANGRY = 2,
  HAPPY = 3,
  WOW = 4,
  LOVE = 5,
}

const AnswerScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'AnswerScreen'>>();
  const route = useRoute<RouteProp<RootParamList, 'AnswerScreen'>>();
  const adsRemote = useAppSelector(stateAdsRemote);
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const imageUri = route.params.imageUri;
  const answer = route.params.answer;
  const solutionStep = route.params.solutionStep;
  const imageWidth = route.params.imageWidth;
  const imageHeight = route.params.imageHeight;
  const screenOpen = route.params.screenOpen;
  const imageRatio = imageWidth / imageHeight;
  const [reviewSelected, setReviewSelected] = useState<eRating | null>(null);
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);
  const {openInAppReview} = useInAppReview();

  const handleGoBack = () => {
    if (screenOpen === 'ScanScreen') {
      navigation.goBack();
    } else if (screenOpen === 'CropScreen') {
      navigation.navigate('BottomTabNavigation', {screen: 'ImageScreen'});
    }
  };

  const handleOpenPremium = () => {};

  const handleRating = () => {
    setIsOpenReview(true);
  };

  const handleShareAnswer = () => {};

  const handleShareApp = () => {};

  useEffect(() => {
    isOpenReview && openInAppReview();
    setIsOpenReview(false);
  }, [isOpenReview]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      {/* Buttom */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <TouchableOpacity
          style={{width: 30, alignItems: 'flex-start'}}
          onPress={handleGoBack}>
          <IconBack />
        </TouchableOpacity>
        <View style={{}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.text_black,
            }}>
            {t('Answer')}
          </Text>
        </View>
        <View style={{width: 30, alignItems: 'flex-end'}}>
          {/* <IconPremium /> */}
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={{}}>
          <View
            style={{
              gap: 15,
              paddingHorizontal: 20,
              paddingBottom: 85,
              paddingTop: 10,
            }}>
            <ResultComponent
              title={t('Question')}
              imageRatio={imageRatio}
              content={imageUri}
            />
            <ResultComponent title={t('Answer')} content={answer} />
            {solutionStep !== NO_INFO && (
              <ResultComponent
                title={t('Solution steps')}
                content={solutionStep}
              />
            )}

            {/* Rating */}
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: '#FFE7A380', alignItems: 'center'},
              ]}>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: theme.colors.text_black,
                  }}>
                  {t('Are you satisfied with this result?')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 12}}>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 100,
                    backgroundColor:
                      reviewSelected === eRating.SAD
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                  onPress={() => {
                    setReviewSelected(eRating.SAD);
                  }}>
                  <IconRateSad />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 100,
                    backgroundColor:
                      reviewSelected === eRating.ANGRY
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                  onPress={() => {
                    setReviewSelected(eRating.ANGRY);
                  }}>
                  <IconRateAngry />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 100,
                    backgroundColor:
                      reviewSelected === eRating.HAPPY
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                  onPress={() => {
                    setReviewSelected(eRating.HAPPY);
                  }}>
                  <IconRateHappy />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 100,
                    backgroundColor:
                      reviewSelected === eRating.WOW
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                  onPress={() => {
                    setReviewSelected(eRating.WOW);
                  }}>
                  <IconRateWow />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 100,
                    backgroundColor:
                      reviewSelected === eRating.LOVE
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                  onPress={() => {
                    setReviewSelected(eRating.LOVE);
                  }}>
                  <IconRateLove />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', paddingHorizontal: 30}}>
                <TouchableOpacity
                  onPress={handleRating}
                  disabled={!reviewSelected}
                  style={{
                    backgroundColor: reviewSelected
                      ? theme.colors.primary
                      : theme.colors.bg_gray,
                    borderRadius: 100,
                    paddingVertical: 10,
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.colors.text_white,
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    {t('Send')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Share */}
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: theme.colors.bg_gray, gap: 15},
              ]}>
              <TouchableOpacity
                onPress={handleShareAnswer}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                  <IconShare />
                  <Text
                    style={{
                      color: theme.colors.text_black,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {t('Share the anwser')}
                  </Text>
                </View>
                <View>
                  <IconRightArrow />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShareApp}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                  <Image
                    source={require('~/resources/images/appIcon.png')}
                    resizeMode="contain"
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      color: theme.colors.text_black,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {t('Share the app')}
                  </Text>
                </View>
                <View>
                  <IconRightArrow />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {adsRemote.ads_banner_splash?.isOn && (
        <View style={{position: 'absolute', width: '100%', bottom: 0, left: 0}}>
          <BannerAd
            unitId={ID_BANNER_OTHERS}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AnswerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  itemContainer: {
    width: '100%',
    borderRadius: 20,
    padding: 15,
    gap: 10,
  },
});

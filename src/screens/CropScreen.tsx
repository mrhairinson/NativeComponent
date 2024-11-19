import {
  Image,
  LayoutChangeEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '~/resources/theme';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {stateLang} from '~/redux/slices/langSlice';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {useModal} from 'react-native-modalfy';
import IconBack from '~/resources/icons/IconBack';
import IconBackArrowDown from '~/resources/icons/IconBackArrowDown';
import {LANG_MAP_VALUE} from './LanguageScreen';
import {LangObjType} from './LanguageScreen';
import {
  resolveProblem,
  resolveAnswerFromAi,
  AiAnswerFormat,
  translateText,
} from '~/utils/callApiAi';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import Config from 'react-native-config';
import ImagePicker from 'react-native-image-crop-picker';
import IconCrop from '~/resources/icons/IconCrop';

const ID_BANNER_OTHERS = __DEV__ ? TestIds.BANNER : Config.banner_others;

const CropScreen = () => {
  const {t} = useTranslation();
  const [lang, setLang] = useState(useAppSelector(stateLang));
  const theme = useAppTheme();
  const adsRemote = useAppSelector(stateAdsRemote);
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'CropScreen'>>();
  const route = useRoute<RouteProp<RootParamList, 'CropScreen'>>();
  const image = route.params.image;
  const [containerRatio, setContainerRatio] = useState<number>(1);
  const containerRatioRef = useRef(containerRatio);
  const [containerWidth, setContainerWidth] = useState<number>(1);
  const containerWidthRef = useRef(containerWidth);
  const [containerHeight, setContainerHeight] = useState<number>(1);
  const containerHeightRef = useRef(containerHeight);
  const dispatch = useAppDispatch();
  const {openModal, closeModals} = useModal();
  const [imageResolution, setImageResolution] = useState<{
    width: number;
    height: number;
  }>({width: 0, height: 0});
  const [resolvedImage, setResolveImage] = useState<string>(
    image.uri as string,
  );
  const [aiAnswer, setAiAnswer] = useState<AiAnswerFormat>({
    isProblem: '',
    result: '',
    solution_step: '',
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const openCropper = () => {
    dispatch(setStateAdsOpen(false));
    ImagePicker.openCropper({
      cropping: true,
      path: image.uri as string,
      mediaType: 'photo',
      freeStyleCropEnabled: true,
      cropperActiveWidgetColor: theme.colors.primary,
      enableRotationGesture: false,
      cropperToolbarTitle: t('Edit Photo'),
      cropperTintColor: theme.colors.primary,
    })
      .then(image => {
        let resizedWidth;
        let resizedHeight;
        const imageRatio = image.width / image.height;
        if (imageRatio > containerRatioRef.current) {
          resizedWidth = containerWidthRef.current;
          resizedHeight = resizedWidth / imageRatio;
        } else {
          resizedHeight = containerHeightRef.current;
          resizedWidth = resizedHeight * imageRatio;
        }
        setImageResolution({width: resizedWidth, height: resizedHeight});
        //Resize image
        ImageResizer.createResizedImage(
          image.path,
          resizedWidth,
          resizedHeight,
          'JPEG',
          100,
          0,
          undefined,
          false,
        )
          .then(resizedImg => {
            setResolveImage(resizedImg.uri);
          })
          .catch(error => {
            console.log('Error when resizing image: ', error);
          });
      })
      .catch(() => {
        let resizedWidth;
        let resizedHeight;
        const imageRatio = (image.width as number) / (image.height as number);
        if (imageRatio > containerRatioRef.current) {
          resizedWidth = containerWidthRef.current;
          resizedHeight = resizedWidth / imageRatio;
        } else {
          resizedHeight = containerHeightRef.current;
          resizedWidth = resizedHeight * imageRatio;
        }
        setImageResolution({width: resizedWidth, height: resizedHeight});
        //Resize image
        ImageResizer.createResizedImage(
          image.uri as string,
          resizedWidth,
          resizedHeight,
          'JPEG',
          100,
          0,
          undefined,
          false,
        )
          .then(resizedImg => {
            setResolveImage(resizedImg.uri);
          })
          .catch(error => {
            console.log('Error when resizing image: ', error);
          });
      });
  };

  //Solve Problem
  const handleSolveProblem = async () => {
    openModal('LoadingModal', {message: t('AI is solving...')});
    const result = await resolveProblem(resolvedImage, lang);
    if (!result.success) {
      closeModals('LoadingModal');
      openModal('ErrorInformModal', {message: result.data});
      return;
    }
    const resolvedAiAnswer: AiAnswerFormat = resolveAnswerFromAi(result.data);
    if (!JSON.parse(resolvedAiAnswer.isProblem)) {
      closeModals('LoadingModal');
      openModal('InformWithTitleModal', {
        message: t(
          'Sorry, we can only help you with Math. Please try scanning again',
        ),
        title: t('Something is wrong :('),
      });
      navigation.goBack();
      return;
    }
    setAiAnswer({...resolvedAiAnswer});
    navigation.navigate('AnswerScreen', {
      imageUri: resolvedImage,
      answer: resolvedAiAnswer.result,
      solutionStep: resolvedAiAnswer.solution_step,
      imageWidth: imageResolution.width,
      imageHeight: imageResolution.height,
      screenOpen: 'CropScreen',
    });
    closeModals('LoadingModal');
  };

  //Translate
  const handleTranslateText = async () => {
    openModal('LoadingModal', {message: t('AI is translating...')});
    const result = await translateText(resolvedImage, lang);
    if (!result.success) {
      closeModals('LoadingModal');
      openModal('ErrorInformModal', {message: result.data});
      return;
    }
    const resolvedAiAnswer: AiAnswerFormat = resolveAnswerFromAi(result.data);
    if (!JSON.parse(resolvedAiAnswer.isProblem)) {
      closeModals('LoadingModal');
      openModal('InformWithTitleModal', {
        message: t(
          'Sorry, we can only help you with Math. Please try scanning again',
        ),
        title: t('Something is wrong :('),
      });
      navigation.goBack();
      return;
    }
    setAiAnswer({...resolvedAiAnswer});
    navigation.navigate('AnswerScreen', {
      imageUri: resolvedImage,
      answer: resolvedAiAnswer.result,
      solutionStep: resolvedAiAnswer.solution_step,
      imageWidth: imageResolution.width,
      imageHeight: imageResolution.height,
      screenOpen: 'CropScreen',
    });
    closeModals('LoadingModal');
  };

  const handleOpenLanguageScreen = () => {
    openModal('LanguageSelectModal', {
      onSelectLanguage: setLang,
      currentLanguage: lang,
    });
  };

  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#ffffff');
    Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');
  }, []);

  //Open crop when user choose image
  useEffect(() => {
    openCropper();
  }, []);

  useEffect(() => {
    containerWidthRef.current = containerWidth;
  }, [containerWidth]);

  useEffect(() => {
    containerHeightRef.current = containerHeight;
  }, [containerHeight]);

  useEffect(() => {
    containerRatioRef.current = containerRatio;
  }, [containerRatio]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <TouchableOpacity style={{width: 30}} onPress={handleGoBack}>
          <IconBack />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.text_black,
            }}>
            {t('Edit')}
          </Text>
        </View>
        <TouchableOpacity style={{width: 30}} onPress={openCropper}>
          <IconCrop colors={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Language */}
      <View style={{width: '100%', gap: 8, alignItems: 'center'}}>
        <Text
          style={{
            color: theme.colors.text_black,
            fontSize: 15,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {t('Explanatory language')}
        </Text>
        <TouchableOpacity
          onPress={handleOpenLanguageScreen}
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.bg_gray,
            gap: 15,
            paddingVertical: 5,
            paddingHorizontal: 14,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <View>{LANG_MAP_VALUE[lang as keyof LangObjType].flag}</View>
          <Text style={{fontSize: 14, color: theme.colors.text_black}}>
            {t(LANG_MAP_VALUE[lang as keyof LangObjType].name)}
          </Text>
          <IconBackArrowDown />
        </TouchableOpacity>
      </View>
      {/* Crop area */}
      <View
        style={{
          flex: 1,
          marginVertical: 15,
          marginHorizontal: 15,
          gap: 10,
        }}>
        <View
          style={{
            flex: 1,
            paddingBottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onLayout={(event: LayoutChangeEvent) => {
            const {width, height} = event.nativeEvent.layout;
            const ratio = width / height;
            setContainerRatio(ratio);
            setContainerWidth(width);
            setContainerHeight(height);
          }}>
          <Image
            resizeMode="contain"
            source={{uri: resolvedImage}}
            style={{
              width: imageResolution.width,
              height: imageResolution.height,
            }}
          />
        </View>
        {/* Button action */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={handleSolveProblem}
            style={{
              paddingHorizontal: 30,
              borderRadius: 100,
              backgroundColor: theme.colors.primary,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 40,
                color: theme.colors.text_white,
              }}>
              {t('Solve')}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handleTranslateText}
            style={{
              paddingHorizontal: 30,
              borderRadius: 100,
              backgroundColor: theme.colors.bg_gray,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 40,
                color: theme.colors.text_black,
              }}>
              {t('Translate')}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* Ads */}
      {adsRemote.ads_banner_others?.isOn && (
        <View style={{width: '100%'}}>
          <BannerAd
            unitId={ID_BANNER_OTHERS}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CropScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  cropArea: {
    position: 'absolute',
  },
  cornerTopLeft: {
    position: 'absolute',
    zIndex: 3,
    width: 25,
    height: 25,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#545AF6',
    left: -2.5,
    top: -2.5,
  },
  cornerTopRight: {
    position: 'absolute',
    zIndex: 3,
    width: 25,
    height: 25,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#545AF6',
    right: -2.5,
    top: -2.5,
  },
  cornerBottomLeft: {
    position: 'absolute',
    zIndex: 3,
    width: 25,
    height: 25,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#545AF6',
    left: -2.5,
    bottom: -2.5,
  },
  cornerBottomRight: {
    position: 'absolute',
    zIndex: 3,
    width: 25,
    height: 25,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#545AF6',
    right: -2.5,
    bottom: -2.5,
  },
  overlay: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

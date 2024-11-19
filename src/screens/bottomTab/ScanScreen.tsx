import {
  BackHandler,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  PanResponder,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
  Image,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import BottomTabHeaderComponent from '~/components/BottomTabHeaderComponent';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
} from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImageEditor from '@react-native-community/image-editor';
import IconNoCamera from '~/resources/icons/IconNoCamera';
import IconScanButton from '~/resources/icons/scanImage/IconScanButton';
import IconConfirm from '~/resources/icons/scanImage/IconConfirm';
import IconSetFlash from '~/resources/icons/scanImage/IconSetFlash';
import IconOpenImage from '~/resources/icons/scanImage/IconOpenImage';
import IconRemove from '~/resources/icons/scanImage/IconRemove';
import {useAppDispatch} from '~/hooks/useReduxStore';
import {setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {useModal} from 'react-native-modalfy';
import {useAppSelector} from '~/hooks/useReduxStore';
import {stateLang} from '~/redux/slices/langSlice';
import {useCameraPermissions} from '~/hooks/useCamera';
import {
  resolveProblem,
  resolveAnswerFromAi,
  AiAnswerFormat,
  translateText,
} from '~/utils/callApiAi';
import {LANG_MAP_VALUE, LangObjType} from '../LanguageScreen';
import IconBackArrowDown from '~/resources/icons/IconBackArrowDown';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

export type Conner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export enum e_CamFunc {
  SOLVE,
  TRANS,
}

type TorchMode = 'on' | 'off' | undefined;

const FILE_PREFIX: string = 'file://';

enum e_Zoom {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

const ScanScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {hasCamPermission, updateCamPermissions, refreshCamPermissions} =
    useCameraPermissions();
  const theme = useAppTheme();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'BottomTabNavigation'>>();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState<boolean>(true);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const minX = screenWidth * 0.075;
  const minY = screenHeight * 0.28;
  const maxCropWidth = screenWidth * 0.85;
  const maxCropHeight = screenHeight * 0.3;
  const minCropWidth = 100;
  const minCropHeight = 50;
  const maxX = minX + maxCropWidth;
  const maxY = minY + maxCropHeight;
  const [lang, setLang] = useState(useAppSelector(stateLang));
  const [camFunc, setCamFunc] = useState<e_CamFunc>(e_CamFunc.SOLVE);
  const [zoomValue, setZoomValue] = useState<e_Zoom>(e_Zoom.ONE);
  const [photo, setPhoto] = useState<string>(FILE_PREFIX); //uri for image
  const [resolvedImage, setResolveImage] = useState<string>(''); //uri Image that send to ai
  const [torchMode, setTorchMode] = useState<TorchMode>('off');
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [cropArea, setCropArea] = useState({
    // Initial crop area
    x: minX,
    y: minY,
    width: maxCropWidth,
    height: maxCropHeight,
  });
  const {openModal, closeModals} = useModal();
  const [aiAnswer, setAiAnswer] = useState<AiAnswerFormat>({
    isProblem: '',
    result: '',
    solution_step: '',
  });

  // Manually permit permission
  const handleOpenSettingDevice = () => {
    Linking.openSettings();
  };

  const handleOpenPremium = () => {
    navigation.navigate('PremiumScreen');
  };

  const handlePressHistory = () => {
    navigation.navigate('HistoryScreen');
  };

  const handlePressSetting = () => {
    navigation.navigate('SettingScreenTemp');
  };

  const handleChangeZoomValue = (zoomValue: e_Zoom) => {
    setZoomValue(zoomValue);
  };

  const handleRemoveCurrentImage = () => {
    setIsCaptured(false);
    handleChangeZoomValue(e_Zoom.ONE);
    setPhoto(FILE_PREFIX);
    setResolveImage('');
    setTorchMode('off');
    setCropArea({
      x: minX,
      y: minY,
      width: maxCropWidth,
      height: maxCropHeight,
    });
  };

  const onError = useCallback((error: CameraRuntimeError) => {
    console.log('!!!Camera error:', error);
  }, []);

  // Function handle press to get answer from AI
  const handleResolveQuestion = async () => {
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
          'Sorry, we can only help you with Math. Please try scanning again.',
        ),
        title: t('Something is wrong :('),
      });
      handleRemoveCurrentImage();
      return;
    }
    //Load ads
    // adsReward.load();
    setAiAnswer({...resolvedAiAnswer});
    navigation.navigate('AnswerScreen', {
      imageUri: resolvedImage,
      answer: resolvedAiAnswer.result,
      solutionStep: resolvedAiAnswer.solution_step,
      imageWidth: cropArea.width,
      imageHeight: cropArea.height,
      screenOpen: 'ScanScreen',
    });
    handleRemoveCurrentImage();
    closeModals('LoadingModal');
  };

  // Function handle press to get answer from AI
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
          'Sorry, your image does not contain text, please try again with another image.',
        ),
        title: t('Opss!!!'),
      });
      handleRemoveCurrentImage();
      return;
    }
    //Load ads
    // adsReward.load();
    setAiAnswer({...resolvedAiAnswer});
    navigation.navigate('AnswerScreen', {
      imageUri: resolvedImage,
      answer: resolvedAiAnswer.result,
      solutionStep: resolvedAiAnswer.solution_step,
      imageWidth: cropArea.width,
      imageHeight: cropArea.height,
      screenOpen: 'ScanScreen',
    });
    handleRemoveCurrentImage();
    closeModals('LoadingModal');
  };

  const handleOpenImageGallery = async () => {
    try {
      dispatch(setStateAdsOpen(false));
      const result = await launchImageLibrary({mediaType: 'photo', quality: 1});
      if (result.assets) {
        handleOpenCropImage(result.assets[0]);
      }
    } catch (error) {
      openModal('InformWithTitleModal', {
        message: t(
          'Sorry, there is some problem with selecting images, please try again later!',
        ),
        title: t('Something went wrong!'),
      });
    }
  };

  const handleOpenCropImage = (image: Asset) => {
    navigation.navigate('CropScreen', {image});
  };

  const handleOpenGallery = async () => {
    handleOpenImageGallery();
  };

  const handleCaptureImage = async () => {
    //Stop Adjust when capture done
    setIsCaptured(true);
    //Capture image
    camera.current
      ?.takeSnapshot({
        quality: 100,
      })
      //Resize image
      .then(capturedImg => {
        const imgUri = FILE_PREFIX + capturedImg?.path;
        const imageWidth = capturedImg?.width ?? SCREEN_WIDTH;
        const imageHeight = capturedImg?.height ?? SCREEN_HEIGHT;
        const resizeHeight = (imageHeight * SCREEN_WIDTH) / imageWidth;
        setPhoto(FILE_PREFIX + capturedImg.path);
        ImageResizer.createResizedImage(
          imgUri,
          SCREEN_WIDTH,
          resizeHeight,
          'JPEG',
          100,
          0,
          undefined,
          false,
        )
          //Crop image
          .then(resizedImg => {
            ImageEditor.cropImage(resizedImg.uri, {
              offset: {x: cropArea.x, y: cropArea.y},
              size: {width: cropArea.width, height: cropArea.height},
            })
              .then(result => {
                setResolveImage(result.uri);
              })
              .catch(error => {
                console.log('Error when getting crop image: ', error);
              });
          })
          .catch(error => {
            console.log('Error when resizing image: ', error);
          });
      })
      .catch(error => {
        console.log('Error when taking snapshot:', error);
      });
  };

  const handleSwitchTorch = () => {
    torchMode === 'on' ? setTorchMode('off') : setTorchMode('on');
  };

  // PanResponders for resizing the corners
  const createResizeResponder = (corner: Conner) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setCropArea(prev => {
          let newCropArea = {...prev};
          switch (corner) {
            case 'topLeft':
              // Resize from top-left corner
              newCropArea.x += gestureState.dx;
              newCropArea.y += gestureState.dy;
              newCropArea.width += gestureState.dx;
              newCropArea.height += gestureState.dy;
              break;
            case 'topRight':
              // Resize from top-right corner
              newCropArea.y += gestureState.dy;
              newCropArea.width += gestureState.dx;
              newCropArea.height += gestureState.dy;
              break;
            case 'bottomLeft':
              // Resize from bottom-left corner
              newCropArea.x += gestureState.dx;
              newCropArea.width += gestureState.dx;
              newCropArea.height += gestureState.dy;
              break;
            case 'bottomRight':
              // Resize from bottom-right corner
              newCropArea.width += gestureState.dx;
              newCropArea.height += gestureState.dy;
              break;
          }
          // Ensure the crop area doesn't go negative or off the screen
          newCropArea.width = Math.max(
            100,
            Math.min(newCropArea.width, maxX - newCropArea.x),
          );
          newCropArea.height = Math.max(
            50,
            Math.min(newCropArea.height, maxY - newCropArea.y),
          );
          newCropArea.x = Math.max(
            minX,
            Math.min(newCropArea.x, maxX - minCropWidth),
          );
          newCropArea.y = Math.max(
            minY,
            Math.min(newCropArea.y, maxY - minCropHeight),
          );

          return newCropArea;
        });
      },
      onPanResponderRelease: () => {
        // Handle when the user releases the corner
      },
    });
  };

  const topLeftResponder = useRef(createResizeResponder('topLeft')).current;
  const topRightResponder = useRef(createResizeResponder('topRight')).current;
  const bottomLeftResponder = useRef(
    createResizeResponder('bottomLeft'),
  ).current;
  const bottomRightResponder = useRef(
    createResizeResponder('bottomRight'),
  ).current;

  const handleOpenLanguageScreen = (
    stateLang: string,
    dispatchLang: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    // navigation.navigate('LanguageScreen', {nextScreen: 'CropScreen'});
    openModal('LanguageSelectModal', {
      onSelectLanguage: dispatchLang,
      currentLanguage: stateLang,
    });
  };

  useEffect(() => {
    if (!hasCamPermission) {
      dispatch(setStateAdsOpen(false));
      refreshCamPermissions();
    }
  }, [refreshCamPermissions]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      setIsActive(true);
      Platform.OS === 'android' && StatusBar.setHidden(true);
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'active') {
          setIsActive(true);
          updateCamPermissions();
        }
      });
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        setIsActive(false);
        Platform.OS === 'android' && StatusBar.setHidden(false);
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        setCamFunc(e_CamFunc.SOLVE);
        subscription.remove();
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View style={{flex: 1, position: 'relative'}}>
        {hasCamPermission ? (
          device ? ( //Main View
            <View style={{flex: 1, justifyContent: 'center'}}>
              {/* Top */}
              <View
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  top: 0,
                  width: '100%',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  gap: 15,
                }}>
                <BottomTabHeaderComponent
                  textColor={theme.colors.text_white}
                  onPressPremium={handleOpenPremium}
                  onPressHistory={handlePressHistory}
                  onPressSetting={handlePressSetting}
                />
                <View style={{width: '100%', gap: 8, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: theme.colors.text_white,
                      fontSize: 15,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    {t('Explanatory language')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenLanguageScreen(lang, setLang);
                    }}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: theme.colors.bg_gray_8A,
                      gap: 8,
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <View>
                      {LANG_MAP_VALUE[lang as keyof LangObjType].flag}
                    </View>
                    <Text
                      style={{fontSize: 14, color: theme.colors.text_white}}>
                      {t(LANG_MAP_VALUE[lang as keyof LangObjType].name)}
                    </Text>
                    <IconBackArrowDown colors={theme.colors.text_white} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Camera */}
              {photo != FILE_PREFIX ? (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}>
                  <Image
                    source={{uri: photo}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Camera
                  device={device}
                  ref={camera}
                  style={StyleSheet.absoluteFill}
                  isActive={isActive}
                  preview={true}
                  photo={true}
                  torch={torchMode}
                  enableZoomGesture={true}
                  zoom={zoomValue}
                  onError={onError}
                />
              )}

              {/* Button bottom */}
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  minHeight: 150,
                  bottom: 0,
                  left: 0,
                  zIndex: 3,
                  gap: 15,
                }}>
                {/* Zoom value */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 26,
                  }}>
                  {!isCaptured && (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: 30,
                        padding: 1,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          handleChangeZoomValue(e_Zoom.ONE);
                        }}
                        style={[
                          styles.zoomContainer,
                          zoomValue === e_Zoom.ONE && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}>
                        <View>
                          <Text style={[styles.zoomText]}>1</Text>
                        </View>
                        {zoomValue === e_Zoom.ONE && (
                          <View>
                            <Text style={[styles.zoomText]}>x</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleChangeZoomValue(e_Zoom.TWO);
                        }}
                        style={[
                          styles.zoomContainer,
                          zoomValue === e_Zoom.TWO && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}>
                        <View>
                          <Text style={[styles.zoomText]}>2</Text>
                        </View>
                        {zoomValue === e_Zoom.TWO && (
                          <View>
                            <Text style={[styles.zoomText]}>x</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleChangeZoomValue(e_Zoom.THREE);
                        }}
                        style={[
                          styles.zoomContainer,
                          zoomValue === e_Zoom.THREE && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}>
                        <View>
                          <Text style={[styles.zoomText]}>3</Text>
                        </View>
                        {zoomValue === e_Zoom.THREE && (
                          <View>
                            <Text style={[styles.zoomText]}>x</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {/* Camera handle button */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 55,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    {isCaptured ? (
                      <>
                        <TouchableOpacity
                          style={{width: 30, alignItems: 'center'}}
                          onPress={handleRemoveCurrentImage}>
                          <IconRemove />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => {
                            camFunc === e_CamFunc.SOLVE &&
                              handleResolveQuestion();
                            camFunc === e_CamFunc.TRANS &&
                              handleTranslateText();
                          }}>
                          <IconConfirm />
                        </TouchableOpacity>
                        <View style={{width: 30, alignItems: 'center'}}></View>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={handleOpenGallery}
                          style={{width: 30, alignItems: 'center'}}>
                          <IconOpenImage />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleCaptureImage}
                          style={{}}>
                          <IconScanButton />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleSwitchTorch}
                          style={{width: 30, alignItems: 'center'}}>
                          <IconSetFlash
                            colors={
                              torchMode === 'on'
                                ? theme.colors.primary
                                : '#FFFFFF'
                            }
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              {/* View of overlay and adjustable crop view */}
              <>
                {/* Overlay for the area outside the crop area */}
                <View
                  style={[
                    styles.overlay,
                    {top: 0, left: 0, width: screenWidth, height: cropArea.y},
                  ]}
                />
                <View
                  style={[
                    styles.overlay,
                    {
                      top: cropArea.y,
                      left: 0,
                      width: cropArea.x,
                      height: cropArea.height,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.overlay,
                    {
                      top: cropArea.y,
                      left: cropArea.x + cropArea.width,
                      width: screenWidth - (cropArea.x + cropArea.width),
                      height: cropArea.height,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.overlay,
                    {
                      top: cropArea.y + cropArea.height,
                      left: 0,
                      width: screenWidth,
                      height: screenHeight - (cropArea.y + cropArea.height),
                    },
                  ]}
                />
                {/* Adjustable Crop Area */}
                <View
                  style={[
                    styles.cropArea,
                    {
                      left: cropArea.x,
                      top: cropArea.y,
                      width: cropArea.width,
                      height: cropArea.height,
                    },
                  ]}>
                  {/* Top-left corner */}
                  <>
                    <View
                      style={[styles.cornerTopLeft, {}]}
                      {...topLeftResponder.panHandlers}
                    />

                    {/* Top-right corner */}
                    <View
                      style={[styles.cornerTopRight, {}]}
                      {...topRightResponder.panHandlers}
                    />

                    {/* Bottom-left corner */}
                    <View
                      style={[styles.cornerBottomLeft, {}]}
                      {...bottomLeftResponder.panHandlers}
                    />

                    {/* Bottom-right corner */}
                    <View
                      style={[styles.cornerBottomRight, {}]}
                      {...bottomRightResponder.panHandlers}
                    />
                  </>
                </View>
              </>
            </View>
          ) : (
            //View if device not support back camera
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000CC',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  textAlign: 'center',
                  color: theme.colors.text_white,
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {t('Your device has no back camera.')}
              </Text>
            </View>
          )
        ) : (
          //View without camera permission
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000CC',
              justifyContent: 'center',
              gap: 20,
              alignItems: 'center',
              paddingHorizontal: 30,
            }}>
            <View>
              <IconNoCamera />
            </View>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  textAlign: 'center',
                  color: theme.colors.text_white,
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {t('Access the camera to scan math problems with EasyMath.')}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={handleOpenSettingDevice}
                style={{
                  borderRadius: 100,
                  backgroundColor: theme.colors.bg_gray,
                  paddingVertical: 15,
                  paddingHorizontal: 40,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#5F6466',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {t('Open Setting')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cropArea: {
    position: 'absolute',
  },
  cornerTopLeft: {
    position: 'absolute',
    zIndex: 3,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#ffffff',
    left: -5,
    top: -5,
  },
  cornerTopRight: {
    position: 'absolute',
    zIndex: 3,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#ffffff',
    right: -5,
    top: -5,
  },
  cornerBottomLeft: {
    position: 'absolute',
    zIndex: 3,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#ffffff',
    left: -5,
    bottom: -5,
  },
  cornerBottomRight: {
    position: 'absolute',
    zIndex: 3,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#ffffff',
    right: -5,
    bottom: -5,
  },
  overlay: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  zoomContainer: {
    flexDirection: 'row',
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  zoomText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
  },
  buttonFuntion: {
    fontWeight: '400',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 30,
  },
});

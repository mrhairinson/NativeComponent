import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '~/resources/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useAppDispatch} from '~/hooks/useReduxStore';
import {setStateAdsOpen} from '~/redux/slices/adsOpenSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import {useModal} from 'react-native-modalfy';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

const pictureData: JSX.Element[] = [
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_1.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_2.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_3.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_4.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_5.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_6.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_7.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_8.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_9.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_10.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_11.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_12.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_13.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_14.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
  <Image
    resizeMode="cover"
    source={require('~/resources/images/pictureScreen/image_15.png')}
    style={{aspectRatio: 1, height: SCREEN_WIDTH / 3.4}}
  />,
];

const ImageScreen = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'BottomTabNavigation'>>();
  const {openModal, closeModals} = useModal();
  const dispatch = useAppDispatch();

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

  const renderPhoto = ({item}: {item: JSX.Element}) => {
    return (
      <TouchableOpacity
        style={[styles.imageContainer, {borderColor: theme.colors.primary}]}
        onPress={() => {
          handleOpenImageGallery();
        }}>
        {item}
      </TouchableOpacity>
    );
  };

  const handleOpenCropImage = (image: Asset) => {
    navigation.navigate('CropScreen', {image});
  };

  useEffect(() => {
    handleOpenImageGallery();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'active') {
        }
      });
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        subscription.remove();
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <View></View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.text_black,
            }}>
            {t('Image')}
          </Text>
        </View>
        <View></View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={pictureData}
          keyExtractor={(item: JSX.Element, index: number) => String(index)}
          renderItem={renderPhoto}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: SCREEN_WIDTH / 10,
    aspectRatio: 1,
    borderRadius: 4,
  },
  imageContainer: {
    margin: 5,
  },
});

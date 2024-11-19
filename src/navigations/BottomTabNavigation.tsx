import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '~/resources/theme';
import Config from 'react-native-config';
import ScanScreen from '~/screens/bottomTab/ScanScreen';
import ImageScreen from '~/screens/bottomTab/ImageScreen';
import SettingScreen from '~/screens/bottomTab/SettingScreen';
import PdfScreen from '~/screens/bottomTab/PdfScreen';
import CaculatorScreen from '~/screens/bottomTab/CaculatorScreen';
import IconTabScan from '~/resources/icons/bottomTab/IconTabScan';
import IconTabImage from '~/resources/icons/bottomTab/IconTabImage';
import IconTabCaculator from '~/resources/icons/bottomTab/IconTabCaculator';
import IconTabSetting from '~/resources/icons/bottomTab/IconTabSetting';
import IconTabPdf from '~/resources/icons/bottomTab/IconTabPdf';
import IconHistory from '~/resources/icons/bottomTab/IconHistory';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '~/hooks/useReduxStore';
import {stateAdsRemote} from '~/redux/slices/remoteAdsSlice';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

export type BottomTabParamList = {
  ScanScreen: undefined;
  ImageScreen: undefined;
  SettingScreen: undefined;
  PdfScreen: undefined;
  CaculatorScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
//COMPONENT
const BottomTabNavigation = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const adsRemote = useAppSelector(stateAdsRemote);
  const ID_BANNER_HOME = adsRemote.ads_banner_home.id;
  const isFocused = useIsFocused();
  const [showBanner, setShowBanner] = useState<boolean>(true);

  useEffect(() => {
    if (isFocused) {
      // Simulate data fetch or reload
      setShowBanner(true);
    }
    return () => {
      setShowBanner(false);
    };
  }, [isFocused]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="ScanScreen"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 63,
            backgroundColor: theme.colors.primary,
            // borderTopLeftRadius: Platform.OS === 'android' ? 10 : 0,
            // borderTopRightRadius: Platform.OS === 'android' ? 10 : 0,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={[styles.tabBtn]}>
                <IconTabScan
                  colors={
                    focused ? theme.colors.tabFocus : theme.colors.tabNotFocus
                  }
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: focused
                      ? theme.colors.tabFocus
                      : theme.colors.tabNotFocus,
                  }}>
                  {t('Scan')}
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={[styles.tabBtn]}>
                <IconTabImage
                  colors={
                    focused ? theme.colors.tabFocus : theme.colors.tabNotFocus
                  }
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: focused
                      ? theme.colors.tabFocus
                      : theme.colors.tabNotFocus,
                  }}>
                  {t('Picture')}
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      {adsRemote.ads_banner_home?.isOn && showBanner && (
        <View style={[{}]}>
          <BannerAd
            unitId={ID_BANNER_HOME}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default BottomTabNavigation;

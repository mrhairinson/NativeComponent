import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {useAppDispatch, useAppSelector} from '~/hooks/useReduxStore';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import BottomTabHeaderComponent from '~/components/BottomTabHeaderComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '~/navigations/RootNavigation';
import IconBackArrowDown from '~/resources/icons/IconBackArrowDown';
import IconCaculator from '~/resources/icons/caculator/IconCaculator';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import KeyboardModeComponent from '~/components/KeyboardModeComponent';

const PADDING_HORIZONTAL = 20;

const KEYBOARD_RATIO = 390 / 285;

const KEYBOARD_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export enum e_CalMode {
  CACULATOR,
  CURRENCY,
  UNIT,
}

const CaculatorScreen = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const [calMode, setCalMode] = useState<e_CalMode>(e_CalMode.CACULATOR); //State with caculator
  const navigation =
    useNavigation<StackNavigationProp<RootParamList, 'BottomTabNavigation'>>();

  const handleOpenPremium = () => {
    navigation.navigate('PremiumScreen');
  };

  const handlePressHistory = () => {
    navigation.navigate('HistoryScreen');
  };

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
      return () => {
        setCalMode(e_CalMode.CACULATOR);
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.bg_white}]}>
      <View style={{}}>
        <BottomTabHeaderComponent
          textColor={theme.colors.text_black}
          onPressPremium={handleOpenPremium}
          onPressHistory={handlePressHistory}
        />
      </View>
      <View style={{flex: 1, paddingBottom: 10, gap: 10}}>
        {/* Result panel */}
        <View style={{flex: 1}}></View>
        {/* Mode change */}
        <TouchableOpacity
          onPress={() => {}}
          style={{
            height: 60,
            width: '100%',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <IconCaculator />
            <Text style={{color: theme.colors.text_black, fontSize: 16}}>
              {t('Caculator')}
            </Text>
          </View>
          <IconBackArrowDown height={11} width={20} />
        </TouchableOpacity>
        {/* Keyboard */}
        <View>
          <KeyboardModeComponent k_width={KEYBOARD_WIDTH} k_ratio={KEYBOARD_RATIO}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});

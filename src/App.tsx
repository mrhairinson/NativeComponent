/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  StatusBar,
  AppState,
  Alert,
  Linking,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import TestScreen from './screens/TestScreen';
import AppOpenAdsProvider from './contexts/AppOpenAdsProvider';
import InternetCheckerProvider from './contexts/InternetCheckerProvider';
import {theme} from './resources/theme';
import NavigationProvider from './navigations/NavigationProvider';
import RootNavigation from './navigations/RootNavigation';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import LoadingModal from './components/modals/LoadingModal';
import ErrorInformModal from './components/modals/ErrorInformModal';
import InformWithTitleModal from './components/modals/InformWithTitleModal';
import LanguageSelectModal from './components/modals/LanguageSelectModal';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import crashlytics from '@react-native-firebase/crashlytics';

if (Platform.OS === 'android') {
  SystemNavigationBar.stickyImmersive();
}
function App(): React.JSX.Element {
  //Change this value to true if you want to test smt
  const devTest = true;
  const modalConfig = {
    LoadingModal: LoadingModal,
    ErrorInformModal: ErrorInformModal,
    InformWithTitleModal: InformWithTitleModal,
    LanguageSelectModal: LanguageSelectModal,
  };
  const defaultOptions = {backdropOpacity: 0.4};
  const stack = createModalStack(modalConfig, defaultOptions);
  const [connectInternet, setConnectInternet] = useState<boolean>(true);

  Platform.OS === 'android' &&
    StatusBar.setBackgroundColor(theme.colors.bg_white);
  Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');

  useEffect(() => {
    crashlytics().recordError;
  }, []);

  const config = {
    maxAdContetRating: 'G',
    tagForChildDirectedTreatment: false,
    tagForUnderAgeConsent: false,
  };

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setConnectInternet(false);
      } else {
        setConnectInternet(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <ModalProvider stack={stack}>
                <BottomSheetModalProvider>
                  {connectInternet ? (
                    <>
                      <AppOpenAdsProvider />
                      {devTest ? <TestScreen /> : <RootNavigation />}
                    </>
                  ) : (
                    <NoInternetScreen />
                  )}
                </BottomSheetModalProvider>
              </ModalProvider>
            </GestureHandlerRootView>
          </NavigationProvider>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

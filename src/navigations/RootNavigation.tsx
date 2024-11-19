import BottomTabNavigation, {
  BottomTabParamList,
} from "./BottomTabNavigation";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TestScreen from "~/screens/TestScreen";
import SplashScreen from "~/screens/SplashScreen";
import LanguageScreen from "~/screens/LanguageScreen";
import OnBoardingScreen from "~/screens/OnBoardingScreen";
import HistoryScreen from "~/screens/HistoryScreen";
import AnswerScreen from "~/screens/AnswerScreen";
import PremiumScreen from "~/screens/PremiumScreen";
import CropScreen from "~/screens/CropScreen";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import LanguageDupScreen from "~/screens/LanguageDupScreen";
import SettingScreenTemp from "~/screens/SettingScreenTemp";
import { Asset } from "react-native-image-picker";

//Type for RootParamList, contains param pass through each screen
export type RootParamList = {
  BottomTabNavigation: NavigatorScreenParams<BottomTabParamList>;
  TestScreen: undefined,
  SplashScreen: undefined,
  LanguageScreen: {nextScreen: string},
  LanguageDupScreen: {langSelected: string},
  OnBoardingScreen: undefined,
  HistoryScreen: undefined,
  PremiumScreen: undefined,
  SettingScreenTemp: undefined,
  AnswerScreen: {
    imageUri: string,
    answer: string,
    solutionStep: string,
    imageWidth: number,
    imageHeight: number,
    screenOpen: "CropScreen" | "ScanScreen",
  },
  CropScreen: {
    image: Asset,
  }
};

//Stack navigation options
const Stack = createStackNavigator<RootParamList>();
const screenOptions = { headerShown: false };

//Root component
const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="LanguageDupScreen"
        component={LanguageDupScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AnswerScreen"
        component={AnswerScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="CropScreen"
        component={CropScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="PremiumScreen"
        component={PremiumScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="SettingScreenTemp"
        component={SettingScreenTemp}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

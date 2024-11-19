import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '~/resources/theme';
import {OnBoadingParams} from '~/data/onBoardingData';
import {TextPath} from 'react-native-svg';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const OnBoardingComponent = ({image, title, subTitle}: OnBoadingParams) => {
  const theme = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, {gap: SCREEN_WIDTH > 400 ? 15 : 8}]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>{image}</View>
      </View>
      <View style={[styles.itemContainer]}>
        <Text
          numberOfLines={2}
          style={{
            color: theme.colors.text_black,
            fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
      <View style={[styles.itemContainer]}>
        <Text
          style={{
            color: theme.colors.text_black,
            fontSize: SCREEN_WIDTH > 400 ? 18 : 16,
            fontWeight: '400',
          }}>
          {subTitle}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

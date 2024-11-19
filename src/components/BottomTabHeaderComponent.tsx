import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import IconPremium from '~/resources/icons/IconPremium';
import IconHistory from '~/resources/icons/bottomTab/IconHistory';
import IconTabSetting from '~/resources/icons/bottomTab/IconTabSetting';

type ComponentParam = {
  onPressPremium: () => void;
  onPressHistory: () => void;
  onPressSetting: () => void;
  textColor: string;
};

const BottomTabHeaderComponent = ({
  textColor,
  onPressPremium,
  onPressHistory,
  onPressSetting,
}: ComponentParam) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{}}>
        <Text
          style={{
            color: textColor,
            fontWeight: '700',
            fontSize: SCREEN_WIDTH > 400 ? 30 : 25,
          }}>
          Photo Math Scanner 
        </Text>
        <Text
          style={{
            color: textColor,
            fontWeight: '700',
            fontSize: SCREEN_WIDTH > 400 ? 30 : 25,
          }}>
          Math Solver
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        {/* <TouchableOpacity onPress={onPressHistory}>
          <IconHistory colors={textColor} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={onPressPremium}>
          <IconPremium />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onPressSetting}>
          <IconTabSetting height={20} width={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomTabHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    width: '100%',
    paddingTop: 20,
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme, useAppTheme} from '~/resources/theme';
import IconRightArrow from '~/resources/icons/setting/IconRightArrow';

type SettingParam = {
  icon: JSX.Element;
  title: string;
  value?: string;
  onPress: () => void;
};

const SettingComponent = ({icon, title, value, onPress}: SettingParam) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        {/* Left */}
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <View style={{width: 20}}>{icon}</View>
          <View>
            <Text style={[styles.title, {color: theme.colors.text_black}]}>
              {title}
            </Text>
          </View>
        </View>
        {/* Right */}
        <View style={{flexDirection: 'row', gap: 11, alignItems: 'center'}}>
          {value && (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#82828B',
                }}>
                {value}
              </Text>
            </View>
          )}
          <View>
            <IconRightArrow />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 14,
  },
});

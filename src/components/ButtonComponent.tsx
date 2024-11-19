import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '~/resources/theme';
import {e_KeyboardMode} from './KeyboardModeComponent';

const RATIO_BIG = 93 / 52;
const RATIO_SMALL = 72 / 35;

type ButtonParam = {
  title: string | JSX.Element;
  bgColor: string;
  textColor?: string;
  textSize?: number;
  onPress: () => void;
};

const ButtonComponent = ({
  title,
  bgColor,
  textColor,
  textSize,
  onPress,
}: ButtonParam) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      }}
      onPress={onPress}>
      {typeof title === 'string' ? (
        <Text
          style={{
            color: textColor ? textColor : theme.colors.text_black,
            fontSize: textSize,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});

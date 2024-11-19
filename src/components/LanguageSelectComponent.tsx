import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import RadioButton from './base/RadioButton';
import {LangList} from '~/data/languageData';
import {useAppTheme} from '~/resources/theme';
import {LangType} from '~/@types/langType';

type SelectLanguage = {
  languageObject: LangList;
  languageSelected: LangType;
  onSelectLanguage: (id: LangType) => void;
  isDisabled?: boolean;
};

const LanguageSelectComponent = ({
  languageObject,
  languageSelected,
  onSelectLanguage,
  isDisabled = false,
}: SelectLanguage) => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const {id, name, image} = languageObject;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        languageSelected === id
          ? {borderColor: theme.colors.primary}
          : {borderColor: theme.colors.bg_gray},
      ]}
      disabled={isDisabled}
      onPress={() => {
        onSelectLanguage(id);
      }}>
      <View style={[styles.iconText]}>
        <View>{image}</View>
        <Text
          style={[
            styles.text,
            languageSelected === id
              ? {color: theme.colors.primary}
              : {color: theme.colors.text_black},
          ]}>
          {t(name)}
        </Text>
      </View>
      <View style={[styles.radioButton]}>
        <RadioButton
          value={languageSelected}
          state={languageSelected === id ? true : false}
          color={
            languageSelected === id
              ? theme.colors.primary
              : theme.colors.bg_gray
          }
          onPress={() => {
            !isDisabled && onSelectLanguage(id);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 57,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 12,
  },
  iconText: {
    flexDirection: 'row',
    gap: 12,
  },
  radioButton: {},
  text: {
    fontSize: 16,
  },
});

export default LanguageSelectComponent;

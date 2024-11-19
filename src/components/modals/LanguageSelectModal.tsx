import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppTheme} from '~/resources/theme';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import IconCheck from '~/resources/icons/IconCheck';
import {LangType} from '~/@types/langType';
import {LangList, langList} from '~/data/languageData';
import LanguageSelectComponent from '../LanguageSelectComponent';
import IconCheckWithBg from '~/resources/icons/languages/IconCheckWithBg';

export type LanguageParam = {
  onSelectLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentLanguage: string;
};

const LanguageSelectModal = ({
  modal: {params, closeModal},
}: {
  modal: {params: LanguageParam; closeModal: any};
}) => {
  const {t} = useTranslation();
  const theme = useAppTheme();
  const [lng, setLng] = useState<LangType>(params.currentLanguage);

  const handleSelectLanguage = (lng: LangType) => {
    setLng(lng);
    params.onSelectLanguage(lng);
  };

  return (
    <View style={[styles.container, {}]}>
      {/* Header */}
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <View style={{width: 40}}></View>
        <View>
          <Text
            style={{
              color: theme.colors.text_white,
              fontSize: 20,
              fontWeight: '600',
            }}>
            {t('Language')}
          </Text>
        </View>
        <View style={{width: 40}}>
          <TouchableOpacity style={{}} onPress={closeModal}>
            <IconCheckWithBg />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scroll */}
      <View style={{flex: 1, paddingHorizontal: 40}}>
        <ScrollView>
          <View style={{paddingTop: 25}}>
            {langList.map((item: LangList, index: number) => (
              <LanguageSelectComponent
                languageObject={item}
                languageSelected={lng}
                onSelectLanguage={handleSelectLanguage}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LanguageSelectModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

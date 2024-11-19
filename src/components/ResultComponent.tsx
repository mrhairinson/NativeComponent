import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '~/resources/theme';
import IconClipBoard from '~/resources/icons/IconClipBoard';
import Clipboard from '@react-native-clipboard/clipboard';

type ComponentParam = {
  title?: string;
  content?: string;
  imageRatio?: number;
};

const handleCopyToClipboard = (content: string | undefined) => {
  if (content) {
    Clipboard.setString(content);
    //show toast success
  } else {
    //Show toast fail
  }
};

const ResultComponent = ({title, content, imageRatio}: ComponentParam) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.bg_gray}]}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: theme.colors.text_black,
            textAlign: 'left',
          }}>
          {title}
        </Text>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            handleCopyToClipboard(content);
          }}>
          <IconClipBoard />
        </TouchableOpacity>
      </View>
      {imageRatio ? (
        <View style={{width: '100%'}}>
          <Image
            source={{uri: content}}
            style={{width: '100%', aspectRatio: imageRatio, borderRadius: 10}}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={{width: '100%'}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 15,
              fontWeight: '500',
              color: theme.colors.text_black,
            }}>
            {content}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ResultComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    padding: 15,
    gap: 10,
  },
});

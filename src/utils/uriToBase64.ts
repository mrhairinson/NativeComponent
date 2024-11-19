import RNFS from 'react-native-fs';

export const convertImageToBase64 = async (uri: string) => {
  try {
    const base64String = await RNFS.readFile(uri, 'base64');
    return base64String;
  } catch (error) {
    console.error('Error converting image to Base64:', error);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = (key: string) => {
  const result = AsyncStorage.getItem(key);
  return result;
};

export const setItem = (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

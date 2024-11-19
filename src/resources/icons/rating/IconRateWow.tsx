import {Image, View} from 'react-native';
import React from 'react';

const IconRateWow = () => {
  return (
    <Image
      source={require('~/resources/images/rating/catWow.png')}
      resizeMode="cover"
      style={{width: 40.5, height: 40.5}}
    />
  );
};

export default IconRateWow;
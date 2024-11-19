import {Image, View} from 'react-native';
import React from 'react';

const IconRateLove = () => {
  return (
    <Image
      source={require('~/resources/images/rating/catLove.png')}
      resizeMode="cover"
      style={{width: 40.5, height: 40.5}}
    />
  );
};

export default IconRateLove;
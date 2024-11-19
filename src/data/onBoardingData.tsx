import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {Image} from 'react-native';
import i18n from '~/i18n';

export type OnBoadingParams = {
  image: JSX.Element;
  title: string;
  subTitle: string;
  id?: number;
};

export const onBoadingList: OnBoadingParams[] = [
  {
    image: (
      <Image
        source={require('../resources/images/OnBoarding/man.png')}
        style={{height: SCREEN_WIDTH > 400 ? 290 : 220, aspectRatio: 1}}
        resizeMode="contain"
      />
    ),
    title: 'AI-powered Solutions at Your Fingertips',
    subTitle: 'Explore a wide range of solutions',
    id: 0,
  },
  {
    image: (
      <Image
        source={require('../resources/images/OnBoarding/cat.png')}
        style={{height: SCREEN_WIDTH > 400 ? 290 : 220, aspectRatio: 1.75}}
        resizeMode="contain"
      />
    ),
    title: 'Work with A Smart Calculator',
    subTitle: 'Efficient and precise calculations',
    id: 1,
  },
  {
    image: (
      <Image
        source={require('../resources/images/OnBoarding/cat.png')}
        style={{height: SCREEN_WIDTH > 400 ? 290 : 220, aspectRatio: 1.75}}
        resizeMode="contain"
      />
    ),
    title: 'Show ads',
    subTitle: 'Show Ads',
    id: 2,
  },
  {
    image: (
      <Image
        source={require('../resources/images/OnBoarding/kid.png')}
        style={{height: SCREEN_WIDTH > 400 ? 290 : 220, aspectRatio: 1}}
        resizeMode="contain"
      />
    ),
    title: 'Scan & Solve Problems',
    subTitle: 'Provides quick and easy results',
    id: 3,
  },
];

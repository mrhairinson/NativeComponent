import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconOpenImage(props: any) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M26.666 3.333H3.334A1.667 1.667 0 001.666 5v20a1.667 1.667 0 001.667 1.667h23.334A1.666 1.666 0 0028.332 25V5a1.667 1.667 0 00-1.666-1.667zM3.334 25V5h23.334v20H3.332z"
        fill="#fff"
      />
      <Path
        d="M7.434 11.667a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-3.834a1.333 1.333 0 11-1.325 1.334 1.333 1.333 0 011.325-1.325v-.009zM18.984 12.808l-4.5 4.5-3.334-3.333a.834.834 0 00-1.175 0l-5.041 5.108v2.359l5.658-5.659 2.742 2.7-3.125 3.125H12.5l7.042-7.041L25 20v-2.35l-4.841-4.842a.833.833 0 00-1.175 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default IconOpenImage;

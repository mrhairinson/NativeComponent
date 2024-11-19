import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function IconClipBoard(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_428_3013)" fill="#111">
        <Path d="M19.667 4.667H7a1 1 0 00-1 1v16a1 1 0 001 1h12.667a1 1 0 001-1v-16a1 1 0 00-1-1zm-.334 16.666h-12V6h12v15.333z" />
        <Path d="M17.333 2.333a1 1 0 00-1-1H3.667a1 1 0 00-1 1v16a1 1 0 001 1H4V2.667h13.333v-.334z" />
      </G>
      <Defs>
        <ClipPath id="clip0_428_3013">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default IconClipBoard;

import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function IconScanButton(props: any) {
  return (
    <Svg
      width={57}
      height={57}
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={28.5} cy={28.5} r={28.5} fill="#8A8A8A" />
      <Circle cx={28.5} cy={28.5} r={23.5} fill="#fff" />
    </Svg>
  );
}

export default IconScanButton;

import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function IconConfirm(props: any) {
  return (
    <Svg
      width={58}
      height={57}
      viewBox="0 0 58 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={28.875} cy={28.5} r={28.5} fill="#8A8A8A" />
      <Circle cx={28.875} cy={28.5} r={23.5} fill="#fff" />
      <Path
        d="M38.75 22.583l-13 13-5.958-5.958 1.527-1.527 4.431 4.42 11.473-11.462 1.527 1.527z"
        fill="#4ECB71"
      />
    </Svg>
  );
}

export default IconConfirm;

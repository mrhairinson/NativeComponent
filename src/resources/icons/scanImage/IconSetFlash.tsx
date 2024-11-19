import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconSetFlash(props: any) {
  return (
    <Svg
      width={13}
      height={25}
      viewBox="0 0 13 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M0 0v13.75h3.75V25l8.75-15h-5l5-10H0z" fill={props.colors} />
    </Svg>
  );
}

export default IconSetFlash;

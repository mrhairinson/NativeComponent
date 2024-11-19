import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconBackArrowDown(props: any) {
  return (
    <Svg
      width={12}
      height={6}
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M12 0L6 6 0 0h12z" fill={props.colors ? props.colors : '#111'} />
    </Svg>
  );
}

export default IconBackArrowDown;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconBack(props: any) {
  return (
    <Svg
      width={11}
      height={19}
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.254 9.462l6.234-6.048c.328-.32.512-.753.512-1.204 0-.452-.184-.885-.512-1.205a1.764 1.764 0 00-.573-.374 1.808 1.808 0 00-1.928.374L.521 8.25a1.706 1.706 0 00-.386.556 1.664 1.664 0 00.386 1.87l7.466 7.33a1.809 1.809 0 001.25.495c.232.001.462-.042.677-.127.214-.085.41-.21.574-.369.328-.32.512-.753.512-1.204 0-.451-.184-.884-.512-1.204L4.254 9.462z"
        fill={props.colors ? props.colors : '#545AF6'}
      />
    </Svg>
  );
}

export default IconBack;

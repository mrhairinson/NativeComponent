import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconTabScan(props: any) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.095 8.969h6.29l-6.29-6.406v6.406zM6.29 25.625a2.4 2.4 0 01-1.776-.752 2.496 2.496 0 01-.74-1.81v-3.844H23.9v3.843c0 .705-.246 1.309-.738 1.81a2.395 2.395 0 01-1.778.753H6.29zM0 16.656v-2.562h27.675v2.562H0zm3.774-5.125V2.562c0-.704.246-1.307.74-1.809A2.407 2.407 0 016.29 0h10.063l7.548 7.688v3.843H3.774z"
        fill={props.colors}
      />
    </Svg>
  );
}

export default IconTabScan;

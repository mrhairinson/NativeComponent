import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconChangeToBig(props: any) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.25 0h-2.1v3.044H0v2.03h3.15v3.044h2.1V5.074H8.4v-2.03H5.25V0zm7.35 3.044H21v2.03h-8.4v-2.03zm0 10.147H21v2.03h-8.4v-2.03zm0 4.06H21v2.029h-8.4v-2.03zm-5.995-4.78L4.2 14.805 1.795 12.47l-1.49 1.44 2.414 2.324L.305 18.56 1.794 20 4.2 17.666 6.604 20l1.491-1.44-2.415-2.325 2.415-2.323-1.49-1.441z"
        fill="#000"
      />
    </Svg>
  );
}

export default IconChangeToBig;

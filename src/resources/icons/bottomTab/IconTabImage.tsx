import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconTabImage(props: any) {
  return (
    <Svg
      width={27}
      height={26}
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M26.906 0H1.794C1.318 0 .862.193.525.536A1.85 1.85 0 000 1.83v21.965c0 .485.189.95.525 1.294.337.343.793.536 1.269.536h25.112c.476 0 .932-.193 1.269-.536a1.85 1.85 0 00.525-1.294V1.83a1.85 1.85 0 00-.525-1.294A1.776 1.776 0 0026.906 0zm-20.7 3.66c.533 0 1.053.162 1.495.463.443.302.788.73.991 1.233.204.501.257 1.053.153 1.586a2.763 2.763 0 01-.736 1.406 2.674 2.674 0 01-1.378.751 2.64 2.64 0 01-1.554-.156 2.703 2.703 0 01-1.208-1.011 2.786 2.786 0 01.335-3.467 2.664 2.664 0 011.902-.804zM3.587 21.05v-3.753l5.382-5.564a.888.888 0 011.264 0l2.323 2.315-6.888 7.001h-2.08zm21.526 0H8.206l5.588-5.703 4.843-4.941a.887.887 0 011.265 0l5.21 5.317v5.326z"
        fill={props.colors}
      />
    </Svg>
  );
}

export default IconTabImage;
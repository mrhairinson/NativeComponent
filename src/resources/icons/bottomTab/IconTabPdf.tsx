import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconTabPdf(props: any) {
  return (
    <Svg
      width={21}
      height={24}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.625 0v7.567c0 .463.203.907.563 1.235.36.327.85.511 1.359.511h8.328v11.641c0 .618-.27 1.21-.75 1.647a2.7 2.7 0 01-1.813.681H2.938a2.7 2.7 0 01-1.811-.681 2.226 2.226 0 01-.751-1.647V2.328c0-.617.27-1.21.75-1.646A2.699 2.699 0 012.939 0h7.687zM9.358 11.464c-.307 1.773-1.327 3.38-2.864 4.508-1.136.833-.097 2.469 1.266 1.993a8.72 8.72 0 015.729 0c1.363.477 2.402-1.159 1.265-1.993-1.536-1.128-2.556-2.735-2.863-4.508-.227-1.31-2.306-1.312-2.533 0zm1.267 2.858l1.033 1.623H9.595l1.03-1.623zM13.188.05c.485.094.93.313 1.28.632l5.656 5.139c.351.318.593.723.696 1.164h-7.633V.05z"
        fill={props.colors}
      />
    </Svg>
  );
}

export default IconTabPdf;

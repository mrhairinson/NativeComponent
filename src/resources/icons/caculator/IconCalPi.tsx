import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCalPi(props:any) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.125 16.667V3.333m8.75 0v13.334M17.5 3.333h-14"
        stroke="#111"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconCalPi

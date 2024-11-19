import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCalSquareRoot(props:any) {
  return (
    <Svg
      width={21}
      height={15}
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 1h-8.313l-4.75 13-3.562-5.571H1"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconCalSquareRoot

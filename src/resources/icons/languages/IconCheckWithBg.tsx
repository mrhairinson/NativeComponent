import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function IconCheckWithBg(props:any) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.567871}
        y={0.533936}
        width={28.9321}
        height={28.9321}
        rx={4.5}
        fill="#F8F8F8"
        stroke="#545AF6"
      />
      <Path
        d="M5.068 16.681l5.763 5.943L24.4 7.034"
        stroke="#545AF6"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconCheckWithBg

import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconDeleteFat(props:any) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 15l6.5-6.5L15 15m0-13L8.499 8.5 2 2"
        stroke={props.colors ? props.colors : "#545AF6"}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconDeleteFat

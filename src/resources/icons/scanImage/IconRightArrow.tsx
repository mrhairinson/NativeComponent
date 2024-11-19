import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconRightArrow(props:any) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 7H1m14 0l-6 6m6-6L9 1"
        stroke={props.colors}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconRightArrow

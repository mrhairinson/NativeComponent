import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCheck(props:any) {
  return (
    <Svg
      width={25}
      height={20}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 12.198l6.857 7.052L24 .75"
        stroke={props.colors ? props.colors : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconCheck

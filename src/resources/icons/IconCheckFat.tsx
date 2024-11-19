import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCheckFat(props:any) {
  return (
    <Svg
      width={22}
      height={15}
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.08.733a1.41 1.41 0 010 2.035l-11.843 11.5a1.514 1.514 0 01-2.096 0L1.22 8.518a1.41 1.41 0 010-2.035 1.514 1.514 0 012.095 0l4.876 4.73L18.99.733a1.514 1.514 0 012.096 0h-.005z"
        fill={props.colors ? props.colors : "#545AF6"}
      />
    </Svg>
  )
}

export default IconCheckFat

import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconHistory(props:any) {
  return (
    <Svg
      width={27}
      height={24}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.25.75A11.25 11.25 0 004 12H.25l4.862 4.863.088.175L10.25 12H6.5a8.744 8.744 0 018.75-8.75A8.744 8.744 0 0124 12a8.744 8.744 0 01-8.75 8.75 8.68 8.68 0 01-6.175-2.575L7.3 19.95a11.188 11.188 0 007.95 3.3 11.25 11.25 0 000-22.5zM14 7v6.25l5.35 3.175.9-1.513-4.375-2.6V7H14z"
        fill={props.colors}
      />
    </Svg>
  )
}

export default IconHistory

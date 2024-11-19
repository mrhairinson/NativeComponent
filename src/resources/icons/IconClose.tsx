import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconClose(props: any) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14 0C6.2 0 0 6.2 0 14s6.2 14 14 14 14-6.2 14-14S21.8 0 14 0zm5.4 21L14 15.6 8.6 21 7 19.4l5.4-5.4L7 8.6 8.6 7l5.4 5.4L19.4 7 21 8.6 15.6 14l5.4 5.4-1.6 1.6z"
        fill="#FFFFFF"
      />
    </Svg>
  )
}

export default IconClose

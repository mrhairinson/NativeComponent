import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconRightArrow(props:any) {
  return (
    <Svg
      width={10}
      height={14}
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.83.293A.947.947 0 00.5 1c0 .265.118.52.33.707l5.568 4.95-5.569 4.95a.944.944 0 00-.315.703c.002.262.12.513.329.699.209.185.49.29.786.293.295.002.579-.1.791-.281l6.364-5.657a.947.947 0 00.33-.707.947.947 0 00-.33-.707L2.42.293A1.2 1.2 0 001.625 0a1.2 1.2 0 00-.796.293z"
        fill="#000"
      />
    </Svg>
  )
}

export default IconRightArrow

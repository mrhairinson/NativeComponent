import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCalThong(props:any) {
  return (
    <Svg
      width={17}
      height={22}
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.91 20.951l-.08-9.975L8.75 1M4.01 15.442c1.297 1.167 3.05 1.816 4.87 1.804 1.822-.013 3.563-.685 4.842-1.87 1.278-1.184 1.989-2.784 1.975-4.446-.013-1.663-.75-3.253-2.047-4.42-1.297-1.168-3.049-1.817-4.87-1.804-1.821.012-3.563.684-4.841 1.869-1.279 1.184-1.99 2.784-1.976 4.447.013 1.662.75 3.252 2.047 4.42z"
        stroke="#111"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconCalThong

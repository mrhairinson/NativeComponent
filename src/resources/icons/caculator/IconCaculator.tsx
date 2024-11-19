import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function IconCaculator(props:any) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={29} height={29} rx={4.5} stroke="#000" />
      <Path
        d="M8.75 2.5h-2.5v3.75H2.5v2.5h3.75v3.75h2.5V8.75h3.75v-2.5H8.75V2.5zm8.75 3.75h10v2.5h-10v-2.5zm0 12.5h10v2.5h-10v-2.5zm0 5h10v2.5h-10v-2.5zm-7.137-5.887L7.5 20.738l-2.862-2.875-1.776 1.774L5.737 22.5l-2.875 2.863 1.776 1.774L7.5 24.262l2.863 2.875 1.774-1.774L9.262 22.5l2.875-2.863-1.774-1.774z"
        fill="#111"
      />
    </Svg>
  )
}

export default IconCaculator

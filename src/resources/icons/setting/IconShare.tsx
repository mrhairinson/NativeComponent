import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconShare(props:any) {
  return (
    <Svg
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.674 5.3l-4.125 4.124a.688.688 0 01-.973-.973l2.952-2.95h-3.41a7.563 7.563 0 00-7.325 5.671.688.688 0 01-1.332-.344 8.932 8.932 0 018.656-6.703h3.413l-2.954-2.95A.688.688 0 0113.55.2l4.125 4.125a.688.688 0 010 .973zm-3.236 8.45H1.374V3.438a.687.687 0 00-1.375 0v11a.687.687 0 00.688.687h13.75a.688.688 0 000-1.375z"
        fill="#111"
      />
    </Svg>
  )
}

export default IconShare

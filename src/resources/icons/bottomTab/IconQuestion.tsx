import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconQuestion(props:any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.5 16.875a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM22.125 12A10.124 10.124 0 1112 1.875 10.136 10.136 0 0122.125 12zm-2.25 0A7.875 7.875 0 1012 19.875 7.883 7.883 0 0019.875 12zM12 6C9.726 6 7.875 7.682 7.875 9.75v.375a1.125 1.125 0 102.25 0V9.75c0-.827.844-1.5 1.875-1.5 1.031 0 1.875.673 1.875 1.5s-.844 1.5-1.875 1.5a1.125 1.125 0 00-1.125 1.125v.75a1.125 1.125 0 002.225.24c1.742-.439 3.025-1.893 3.025-3.615C16.125 7.682 14.275 6 12 6z"
        fill={props.colors}
      />
    </Svg>
  )
}

export default IconQuestion

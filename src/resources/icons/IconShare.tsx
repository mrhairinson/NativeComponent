import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconShare(props:any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 19.711c-.833 0-1.542-.287-2.125-.862A2.83 2.83 0 0112 16.754c0-.098.025-.328.075-.69l-7.025-4.04a2.978 2.978 0 01-2.05.788c-.833 0-1.542-.287-2.125-.862A2.83 2.83 0 010 9.856c0-.822.292-1.52.875-2.095C1.458 7.186 2.167 6.9 3 6.9a3.002 3.002 0 012.05.788l7.025-4.04a1.636 1.636 0 01-.062-.333A5.18 5.18 0 0112 2.957c0-.822.292-1.52.875-2.095C13.458.287 14.167 0 15 0s1.542.287 2.125.862A2.83 2.83 0 0118 2.957a2.83 2.83 0 01-.875 2.094c-.583.575-1.292.862-2.125.862a3.002 3.002 0 01-2.05-.788l-7.025 4.04c.033.116.054.227.063.334a5.742 5.742 0 010 .715 1.483 1.483 0 01-.063.332l7.025 4.04c.267-.246.575-.439.925-.578.35-.14.725-.21 1.125-.21.833 0 1.542.287 2.125.862A2.83 2.83 0 0118 16.755a2.83 2.83 0 01-.875 2.094c-.583.575-1.292.862-2.125.862z"
        fill="#000"
      />
    </Svg>
  )
}

export default IconShare

import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconRemove(props:any) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.188 0a12.188 12.188 0 1012.187 12.188A12.2 12.2 0 0012.187 0zM16.6 15.274a.937.937 0 11-1.327 1.327l-3.086-3.088L9.1 16.6a.937.937 0 11-1.327-1.327l3.088-3.086L7.774 9.1a.938.938 0 111.327-1.327l3.086 3.088 3.087-3.088a.938.938 0 111.327 1.327l-3.088 3.086 3.088 3.087z"
        fill="#fff"
      />
    </Svg>
  )
}

export default IconRemove

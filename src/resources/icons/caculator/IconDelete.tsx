import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconDelete(props:any) {
  return (
    <Svg
      width={27}
      height={18}
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.086 0H26.5v18H9.086l-.293-.293-8-8L.086 9l.707-.707 8-8L9.086 0zm.828 2l-7 7 7 7H24.5V2H9.914zM13.5 4.586l.707.707L16.5 7.586l2.293-2.293.707-.707L20.914 6l-.707.707L17.914 9l2.293 2.293.707.707-1.414 1.414-.707-.707-2.293-2.293-2.293 2.293-.707.707L12.086 12l.707-.707L15.086 9l-2.293-2.293L12.086 6 13.5 4.586z"
        fill="#000"
      />
    </Svg>
  )
}

export default IconDelete

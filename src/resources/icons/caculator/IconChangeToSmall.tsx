import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconChangeToSmall(props:any) {
  return (
    <Svg
      width={27}
      height={25}
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.888 3.447a.613.613 0 00-.868.006l-2.585 2.62-2.62-2.585a.613.613 0 10-.862.874l2.62 2.585-2.585 2.62a.614.614 0 00.874.862l2.585-2.62 2.62 2.585a.613.613 0 00.862-.874l-2.62-2.585 2.585-2.62a.613.613 0 00-.006-.868zM12.175 18.75c-.19 0-.373.11-.507.305s-.21.46-.21.737c0 .276.076.54.21.736.134.196.317.305.507.305H22.2c.19 0 .372-.11.506-.305s.21-.46.21-.736c0-.277-.076-.542-.21-.737-.134-.195-.317-.305-.506-.305H12.174zm0 4.167c-.19 0-.373.11-.507.305s-.21.46-.21.736c0 .277.076.542.21.737.134.195.317.305.507.305H22.2c.19 0 .372-.11.506-.305s.21-.46.21-.737c0-.276-.076-.54-.21-.736-.134-.196-.317-.305-.506-.305H12.174zM0 7.292c0-.277.075-.542.21-.737.134-.195.316-.305.506-.305h10.026c.19 0 .372.11.507.305.134.195.21.46.21.737 0 .276-.076.54-.21.736-.135.196-.317.305-.507.305H.716c-.19 0-.372-.11-.506-.305A1.318 1.318 0 010 7.292z"
        fill="#000"
      />
      <Path
        d="M11.458 14.583H6.901l-2.604 9.375-1.953-4.018H1.042"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconChangeToSmall
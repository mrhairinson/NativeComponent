import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconPremium(props:any) {
  return (
    <Svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5 .5c-.186 0-.368.045-.526.13a.93.93 0 00-.368.354l-4 7a.781.781 0 00-.1.487c.021.167.097.325.218.456l13 14a.992.992 0 00.346.238 1.12 1.12 0 00.86 0 .992.992 0 00.346-.238l13-14a.821.821 0 00.218-.456.781.781 0 00-.1-.487l-4-7a.93.93 0 00-.368-.353A1.108 1.108 0 0023 .5H5zm-2.382 7l3-5.25h4.101l-1.5 5.25H2.618zm.483 1.75h5.164l3.227 9.037L3.101 9.25zm7.26 0h7.279L14 19.441 10.361 9.25zm9.374 0H24.9l-8.391 9.037 3.226-9.037zm5.647-1.75h-5.601l-1.5-5.25h4.101l3 5.25zm-7.663 0h-7.438l1.5-5.25h4.438l1.5 5.25z"
        fill="#F5A62E"
      />
    </Svg>
  )
}

export default IconPremium

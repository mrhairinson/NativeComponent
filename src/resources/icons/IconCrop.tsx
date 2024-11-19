import * as React from 'react';
import Svg, {G, Mask, Path, Defs, ClipPath} from 'react-native-svg';

function IconCrop(props: any) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_604_1607)">
        <Mask id="a" fill="#fff">
          <Path d="M16.292 14.375h1.916V6.708a1.922 1.922 0 00-1.916-1.916H8.625v1.917h7.667v7.666zm-9.584 1.917V.958H4.792v3.834H.958v1.917h3.834v9.583c0 1.054.862 1.916 1.916 1.916h9.584v3.834h1.916v-3.834h3.834v-1.916H6.708z" />
        </Mask>
        <Path
          d="M16.292 14.375h1.916V6.708a1.922 1.922 0 00-1.916-1.916H8.625v1.917h7.667v7.666zm-9.584 1.917V.958H4.792v3.834H.958v1.917h3.834v9.583c0 1.054.862 1.916 1.916 1.916h9.584v3.834h1.916v-3.834h3.834v-1.916H6.708z"
          fill="#545AF6"
        />
        <Path
          d="M16.292 14.375h-2v2h2v-2zm1.916 0v2h2v-2h-2zM8.625 4.792v-2h-2v2h2zm0 1.917h-2v2h2v-2zm7.667 0h2v-2h-2v2zm-9.584 9.583h-2v2h2v-2zm0-15.334h2v-2h-2v2zm-1.916 0v-2h-2v2h2zm0 3.834v2h2v-2h-2zm-3.834 0v-2h-2v2h2zm0 1.917h-2v2h2v-2zm3.834 0h2v-2h-2v2zm11.5 11.5h2v-2h-2v2zm0 3.833h-2v2h2v-2zm1.916 0v2h2v-2h-2zm0-3.834v-2h-2v2h2zm3.834 0v2h2v-2h-2zm0-1.916h2v-2h-2v2zm-5.75.083h1.916v-4h-1.916v4zm3.916-2V6.708h-4v7.667h4zm0-7.667a3.922 3.922 0 00-3.916-3.916v4a.101.101 0 01-.038-.008.07.07 0 01-.023-.015.071.071 0 01-.015-.023.103.103 0 01-.008-.038h4zm-3.916-3.916H8.625v4h7.667v-4zm-9.667 2v1.917h4V4.792h-4zm2 3.917h7.667v-4H8.625v4zm5.667-2v7.666h4V6.708h-4zm-5.584 9.583V.958h-4v15.334h4zm-2-17.334H4.792v4h1.916v-4zm-3.916 2v3.834h4V.958h-4zm2 1.834H.958v4h3.834v-4zm-5.834 2v1.917h4V4.792h-4zm2 3.917h3.834v-4H.958v4zm1.834-2v9.583h4V6.708h-4zm0 9.583a3.922 3.922 0 003.916 3.916v-4a.1.1 0 01.038.009.07.07 0 01.023.014.07.07 0 01.015.023.101.101 0 01.008.038h-4zm3.916 3.916h9.584v-4H6.708v4zm7.584-2v3.834h4v-3.834h-4zm2 5.834h1.916v-4h-1.916v4zm3.916-2v-3.834h-4v3.834h4zm-2-1.834h3.834v-4h-3.834v4zm5.834-2v-1.916h-4v1.916h4zm-2-3.916H6.708v4h15.334v-4z"
          fill="#545AF6"
          mask="url(#a)"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_604_1607">
          <Path fill="#fff" d="M0 0H23V23H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default IconCrop;
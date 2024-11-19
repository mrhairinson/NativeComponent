import {MD3LightTheme as DefaultTheme, useTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#545AF6',
    bg_white: '#FFFFFF',
    bg_gray: "#D9D9D9",
    bg_gray_8A: "#8A8A8A",
    bg_light_yellow: "rgba(255, 231, 163, 0.5)",
    text_white: "#FFFFFF",
    text_black: "#000000",
    tabFocus: "#F5A62E",
    tabNotFocus: "#FFFFFF",
    btnCalFunc: "#D2D3DA",
    btnCalNum: "#E1E1E180",
    btnCalOperator: "#545AF6",
    btnCalSpec: "#F5A62E",
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

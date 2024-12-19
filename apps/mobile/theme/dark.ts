import { configureFonts } from "react-native-paper";
import { ReactNativePaperCustomTheme } from "styled-components/native";
import fontConfig from "./fonts";
import { spacing } from "./spacing";

export const darkTheme: Partial<ReactNativePaperCustomTheme> = {
  colors: {
    primary: "rgb(224, 182, 255)",
    onPrimary: "rgb(75, 0, 125)",
    primaryContainer: "rgb(107, 0, 175)",
    onPrimaryContainer: "rgb(242, 218, 255)",
    secondary: "rgb(255, 176, 206)",
    onSecondary: "rgb(93, 17, 56)",
    secondaryContainer: "rgb(121, 41, 79)",
    onSecondaryContainer: "rgb(255, 217, 229)",
    tertiary: "rgb(255, 178, 189)",
    onTertiary: "rgb(103, 0, 37)",
    tertiaryContainer: "rgb(144, 0, 55)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(75, 69, 77)",
    onSurfaceVariant: "rgb(205, 196, 206)",
    outline: "rgb(150, 142, 152)",
    outlineVariant: "rgb(75, 69, 77)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(140, 14, 224)",
    elevation: {
      level0: "transparent",
      level1: "rgb(39, 35, 41)",
      level2: "rgb(45, 39, 48)",
      level3: "rgb(50, 44, 55)",
      level4: "rgb(52, 46, 57)",
      level5: "rgb(56, 49, 62)",
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(52, 46, 55, 0.4)",
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
};

export default darkTheme;

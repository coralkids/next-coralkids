import { configureFonts } from "react-native-paper";
import { ReactNativePaperCustomTheme } from "styled-components/native";
import fontConfig from "./fonts";

export const lightTheme: Partial<ReactNativePaperCustomTheme> = {
  colors: {
    primary: "rgb(140, 14, 224)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(242, 218, 255)",
    onPrimaryContainer: "rgb(45, 0, 79)",
    secondary: "rgb(151, 64, 103)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 217, 229)",
    onSecondaryContainer: "rgb(62, 0, 34)",
    tertiary: "rgb(189, 0, 74)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 217, 221)",
    onTertiaryContainer: "rgb(64, 0, 20)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(29, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(29, 27, 30)",
    surfaceVariant: "rgb(233, 223, 234)",
    onSurfaceVariant: "rgb(75, 69, 77)",
    outline: "rgb(124, 117, 126)",
    outlineVariant: "rgb(205, 196, 206)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(50, 47, 51)",
    inverseOnSurface: "rgb(246, 239, 243)",
    inversePrimary: "rgb(224, 182, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(249, 239, 253)",
      level2: "rgb(246, 232, 253)",
      level3: "rgb(242, 225, 252)",
      level4: "rgb(241, 223, 251)",
      level5: "rgb(239, 218, 251)",
    },
    surfaceDisabled: "rgba(29, 27, 30, 0.12)",
    onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
    backdrop: "rgba(52, 46, 55, 0.4)",
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
};

export default lightTheme;

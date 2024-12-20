import { MD3Theme } from "react-native-paper/lib/typescript/types";
import "styled-components/native";

declare module "styled-components/native" {
  export type ReactNativePaperCustomTheme = MD3Theme;
  export interface ThemeStyledProps {
    theme: ReactNativePaperCustomTheme;
  }
}

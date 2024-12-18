import { ThemeProp } from "react-native-paper/lib/typescript/types";
import "styled-components/native";

declare module "styled-components/native" {
  export type ReactNativePaperCustomTheme = ThemeProp;
  export interface ThemeStyledProps {
    theme: ReactNativePaperCustomTheme;
  }
}

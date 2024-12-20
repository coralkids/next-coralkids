import { Stack } from "expo-router";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import ClerkConvexProvider from "@/lib/core/ui/ClerkConvexProvider";
import BaseLayout from "@/lib/core/ui/BaseLayout";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useColorScheme } from "@/lib/core/hooks/useColorScheme.web";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as ExpoRouterThemeProvider,
  Theme,
} from "@react-navigation/native";

import merge from "deepmerge";

import lightTheme from "../theme/light";
import darkTheme from "../theme/dark";

import {
  ReactNativePaperCustomTheme,
  ThemeProvider,
  ThemeStyledProps,
} from "styled-components/native";

const StyledComponentsThemeProvider =
  ThemeProvider as React.JSXElementConstructor<
    React.PropsWithChildren<ThemeStyledProps>
  >;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function RootLayout() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  const colorScheme = useColorScheme();

  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  const paperTheme: ReactNativePaperCustomTheme = (
    colorScheme === "dark"
      ? {
          ...CombinedDarkTheme,
          colors: darkTheme.colors,
          fonts: darkTheme.fonts,
        }
      : {
          ...CombinedDefaultTheme,
          colors: lightTheme.colors,
          fonts: darkTheme.fonts,
        }
  ) as ReactNativePaperCustomTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <StyledComponentsThemeProvider theme={paperTheme}>
        <ClerkConvexProvider>
          <ExpoRouterThemeProvider
            value={paperTheme as ReactNativePaperCustomTheme & Theme}
          >
            <GestureHandlerRootView>
              <BaseLayout>
                <Stack screenOptions={{ headerShown: false }} />
              </BaseLayout>
            </GestureHandlerRootView>
          </ExpoRouterThemeProvider>
        </ClerkConvexProvider>
      </StyledComponentsThemeProvider>
    </PaperProvider>
  );
}

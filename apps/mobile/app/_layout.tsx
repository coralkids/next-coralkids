import { Platform, StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import React, { StrictMode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import ClerkConvexProvider from "@/components/ClerkConvexProvider";
import BaseLayout from "@/components/BaseLayout";
import { AppRegistry } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import * as app from "../app.json";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import merge from "deepmerge";

import lightTheme from "../theme/light.json";
import darkTheme from "../theme/dark.json";

import type { ThemeProp } from "react-native-paper/lib/typescript/types";

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

  const paperTheme = (
    colorScheme === "dark"
      ? { ...CombinedDarkTheme, colors: darkTheme.colors }
      : { ...CombinedDefaultTheme, colors: lightTheme.colors }
  ) as ThemeProp;

  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 40 : StatusBar.currentHeight;

  return (
    <StrictMode>
      <ClerkConvexProvider>
        <PaperProvider theme={paperTheme}>
          <BaseLayout>
            <View
              style={{
                height: STATUS_BAR_HEIGHT,
                backgroundColor: "#0D87E1",
              }}
            >
              <StatusBar
                translucent
                backgroundColor={"#0D87E1"}
                barStyle="light-content"
              />
            </View>
            <Slot screenOptions={{ headerShown: false }} />
          </BaseLayout>
        </PaperProvider>
      </ClerkConvexProvider>
    </StrictMode>
  );
}

AppRegistry.registerComponent(app.expo.name, () => RootLayout);

import { Slot } from "expo-router";
import React, { StrictMode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox, Platform, View } from "react-native";
import ClerkConvexProvider from "@/lib/core/ui/ClerkConvexProvider";
import BaseLayout from "@/lib/core/ui/BaseLayout";
import { AppRegistry, StatusBar } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import * as app from "../app.json";
import { useColorScheme } from "@/lib/core/hooks/useColorScheme.web";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import merge from "deepmerge";

import lightTheme from "../theme/light";
import darkTheme from "../theme/dark";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  ReactNativePaperCustomTheme,
  ThemeProvider,
} from "styled-components/native";

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

  const paperTheme: ReactNativePaperCustomTheme =
    colorScheme === "dark"
      ? { ...CombinedDarkTheme, colors: darkTheme.colors }
      : { ...CombinedDefaultTheme, colors: lightTheme.colors };

  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 50 : StatusBar.currentHeight;

  return (
    <StrictMode>
      <ClerkConvexProvider>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider theme={paperTheme}>
            <BaseLayout>
              <View
                style={{
                  height: STATUS_BAR_HEIGHT,
                  backgroundColor:
                    colorScheme === "dark"
                      ? darkTheme.colors?.background
                      : lightTheme.colors?.background,
                }}
              >
                <StatusBar translucent />
              </View>
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Slot screenOptions={{ headerShown: false }} />
                </SafeAreaView>
              </SafeAreaProvider>
            </BaseLayout>
          </ThemeProvider>
        </PaperProvider>
      </ClerkConvexProvider>
    </StrictMode>
  );
}

AppRegistry.registerComponent(app.expo.name, () => RootLayout);

import { Platform, StatusBar, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import React, { StrictMode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import { useColorScheme } from "./hooks/useColorScheme";
import { ClerkConvexProvider } from "./components/ClerkConvexProvider";
import useLoadResources from "./hooks/useLoadResources";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 50 : StatusBar.currentHeight;

  return (
    <StrictMode>
      <ClerkConvexProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <View
            style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#0D87E1" }}
          >
            <StatusBar
              translucent
              backgroundColor={"#0D87E1"}
              barStyle="light-content"
            />
          </View>
          <Slot screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </ClerkConvexProvider>
    </StrictMode>
  );
}

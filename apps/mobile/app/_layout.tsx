import { Platform, StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import React, { StrictMode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import ClerkConvexProvider from "./components/ClerkConvexProvider";
import BaseLayout from "./components/BaseLayout";
import { AppRegistry } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import * as app from "../app.json";
import { useColorScheme } from "./hooks/useColorScheme.web";
import lightTheme from "./theme/light.json";
import darkTheme from "./theme/dark.json";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  const colorScheme = useColorScheme();

  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: darkTheme }
      : { ...MD3LightTheme, colors: lightTheme };

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

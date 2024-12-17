import { Platform, StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import React, { StrictMode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import ClerkConvexProvider from "./components/ClerkConvexProvider";
import BaseLayout from "./components/BaseLayout";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as app from "../app.json";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 40 : StatusBar.currentHeight;

  return (
    <StrictMode>
      <ClerkConvexProvider>
        <PaperProvider>
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

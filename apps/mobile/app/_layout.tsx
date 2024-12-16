import { tokenCache } from "@/utils/cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "./hooks/useColorScheme";

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error("EXPO_PUBLIC_CONVEX_URL is not defined and is requred");
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

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

  const [loaded] = useFonts({
    Bold: require("./assets/fonts/Inter-Bold.ttf"),
    SemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    Medium: require("./assets/fonts/Inter-Medium.ttf"),
    Regular: require("./assets/fonts/Inter-Regular.ttf"),
    MBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MLight: require("./assets/fonts/Montserrat-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return false;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

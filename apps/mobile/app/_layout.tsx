import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack } from "expo-router";
import { LogBox, Platform, StatusBar, View } from "react-native";

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error("EXPO_PUBLIC_CONVEX_URL is not defined and is requred");
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

export default function RootLayout() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 50 : StatusBar.currentHeight;

  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <View
            style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#0D87E1" }}
          >
            <StatusBar translucent backgroundColor={"#0D87E1"} />
          </View>
          <Stack screenOptions={{ headerShown: false }} />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

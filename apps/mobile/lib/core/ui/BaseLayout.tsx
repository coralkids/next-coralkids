import React from "react";

import { useClerk } from "@clerk/clerk-react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import styled, { ThemeStyledProps } from "styled-components/native";
export const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { loaded: clerkLoaded } = useClerk();

  const [loaded] = useFonts({
    Bold: require("@/assets/fonts/Inter-Bold.ttf"),
    SemiBold: require("@/assets/fonts/Inter-SemiBold.ttf"),
    Medium: require("@/assets/fonts/Inter-Medium.ttf"),
    Regular: require("@/assets/fonts/Inter-Regular.ttf"),
    MBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    MMedium: require("@/assets/fonts/Montserrat-Medium.ttf"),
    MRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MLight: require("@/assets/fonts/Montserrat-Light.ttf"),
  });

  useEffect(() => {
    if (loaded && clerkLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, clerkLoaded]);

  if (loaded && clerkLoaded) {
    if (Platform.OS === "web") {
      return (
        <AppScreen>
          <AppContainer>{children}</AppContainer>
        </AppScreen>
      );
    }

    return children;
  }
};

const AppScreen = styled(View)`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.elevation.level1};
`;

const AppContainer = styled(View)`
  max-width: 1024px;
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

export default BaseLayout;

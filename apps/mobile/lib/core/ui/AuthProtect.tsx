import React from "react";

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useConvexAuth } from "convex/react";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const ConvexSignedIn: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const auth = useConvexAuth();
  const theme = useTheme();

  if (auth.isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme.colors.primary}
      />
    );
  }

  if (auth.isAuthenticated) {
    return children;
  }
};

export const AuthProtect: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Redirect href="/(auth)/sign-in" />
      </SignedOut>
    </>
  );
};

export default AuthProtect;

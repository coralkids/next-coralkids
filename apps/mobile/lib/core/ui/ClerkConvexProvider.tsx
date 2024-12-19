import React, { useState } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { tokenCache } from "@/lib/core/utils/cache";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/clerk-react";
import { ActivityIndicator } from "react-native-paper";

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error("EXPO_PUBLIC_CONVEX_URL is not defined and is requred");
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export const ClerkConvexProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined and is requred",
    );
  }

  const [clerkLoading, setClerkLoading] = useState(false);

  React.useEffect(() => setClerkLoading(true), []);

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>{children}</ClerkLoaded>
        <ClerkLoading>
          <ActivityIndicator animating={clerkLoading} size="large" />
        </ClerkLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ClerkConvexProvider;

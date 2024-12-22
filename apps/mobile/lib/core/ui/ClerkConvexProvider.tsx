import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { tokenCache } from "@/lib/core/utils/cache";
import { ClerkLoaded, useAuth } from "@clerk/clerk-react";
import { LocalizationResource } from "@clerk/types";

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

  const localization: LocalizationResource = {
    signIn: {
      start: {
        title: "Bienvenid@ a Coralkids!",
        subtitle: "Inicia sesión para continuar",
        actionText: "",
        actionLink: "",
      },
    },
  };

  return (
    <ClerkProvider
      localization={localization}
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ClerkConvexProvider;

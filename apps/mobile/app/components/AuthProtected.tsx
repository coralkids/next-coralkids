import React from "react";

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";

export const AuthProtected: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <SignedIn>
        <Slot />
      </SignedIn>
      <SignedOut>
        <Redirect href="/(auth)/sign-in" />
      </SignedOut>
    </>
  );
};

export default AuthProtected;

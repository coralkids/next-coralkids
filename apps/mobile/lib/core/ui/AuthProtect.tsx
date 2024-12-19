import React from "react";

import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

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

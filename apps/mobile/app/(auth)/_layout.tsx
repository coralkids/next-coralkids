import { Redirect, Slot } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";

export default function AuthRoutesLayout() {
  return (
    <>
      <SignedIn>
        <Redirect href="/(home)" />
      </SignedIn>
      <SignedOut>
        <Slot screenOptions={{ headerShown: false }} />
      </SignedOut>
    </>
  );
}

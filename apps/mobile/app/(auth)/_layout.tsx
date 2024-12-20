import { Redirect, Slot } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";

export default function AuthRoutesLayout() {
  return (
    <>
      <SignedIn>
        <Redirect href="/" />
      </SignedIn>
      <SignedOut>
        <Slot />
      </SignedOut>
    </>
  );
}

import { Redirect, Slot } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";
import useLoadResources from "../hooks/useLoadResources";

export default function AuthRoutesLayout() {
  useLoadResources();

  return (
    <>
      <SignedIn>
        <Redirect href={"/"} />
      </SignedIn>
      <SignedOut>
        <Slot screenOptions={{ headerShown: false }} />
      </SignedOut>
    </>
  );
}

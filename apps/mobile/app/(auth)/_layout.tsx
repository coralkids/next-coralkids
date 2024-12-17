import { Redirect, Slot } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";

export default function AuthRoutesLayout() {
  return (
    <BaseLayout>
      <SignedIn>
        <Redirect href={"/"} />
      </SignedIn>
      <SignedOut>
        <Slot screenOptions={{ headerShown: false }} />
      </SignedOut>
    </BaseLayout>
  );
}

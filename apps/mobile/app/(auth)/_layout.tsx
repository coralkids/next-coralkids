import { Redirect, Slot } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";
import { Button } from "react-native-paper";

export default function AuthRoutesLayout() {
  return (
    <>
      <SignedIn>
        <Redirect href="/(home)" />
      </SignedIn>
      <SignedOut>
        <Button
          icon="camera"
          mode="elevated"
          onPress={() => console.log("Pressed")}
        >
          Press me
        </Button>
        <Slot />
      </SignedOut>
    </>
  );
}

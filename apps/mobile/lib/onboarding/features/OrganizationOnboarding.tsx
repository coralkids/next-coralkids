import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar, ProgressBar, Text } from "react-native-paper";

export default function OrganizationOnboarding() {
  const router = useRouter();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            router.canGoBack() ? router.back() : router.navigate("/")
          }
        ></Appbar.BackAction>
        <Appbar.Content title="Registar nueva escuela"></Appbar.Content>
      </Appbar.Header>
      <View>
        <ProgressBar progress={0.2} />
        <Text variant="titleLarge">Crear org</Text>
      </View>
    </>
  );
}

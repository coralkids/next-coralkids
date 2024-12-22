import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import styled from "styled-components/native";

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
      <OrganizationOnboardingContainer>
        <ProgressBar progress={0} />
      </OrganizationOnboardingContainer>
    </>
  );
}

const OrganizationOnboardingContainer = styled(View)`
  flex: 1;
`;

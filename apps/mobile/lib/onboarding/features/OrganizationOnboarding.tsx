import MultiStepFormWizard from "@/lib/core/features/MultiStepFormWizard";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import styled from "styled-components/native";

export default function OrganizationOnboarding() {
  const router = useRouter();

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction
          onPress={() =>
            router.canGoBack() ? router.back() : router.navigate("/")
          }
        ></Appbar.BackAction>
        <Appbar.Content title="Registar nueva escuela"></Appbar.Content>
      </Appbar.Header>
      <OrganizationOnboardingContainer>
        <MultiStepFormWizard
          steps={[
            {
              render: () => <Text>Paso 1</Text>,
            },
            {
              render: () => <Text>Paso 2</Text>,
            },
            {
              render: () => <Text>Paso 3</Text>,
            },
          ]}
        />
      </OrganizationOnboardingContainer>
    </>
  );
}

const OrganizationOnboardingContainer = styled(View)`
  flex: 1;
`;

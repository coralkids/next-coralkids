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
      <Appbar.Header>
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
              onNext: async () =>
                new Promise((resolve) => {
                  global.setTimeout(function () {
                    resolve();
                  }, 1000);
                }),
            },
            {
              render: () => <Text>Paso 2</Text>,
              canSkip: true,
              onNext: async () =>
                new Promise((resolve) => {
                  global.setTimeout(function () {
                    resolve();
                  }, 1000);
                }),
            },
            {
              render: () => <Text>Paso 3</Text>,
              onNext: async () =>
                new Promise((resolve) => {
                  global.setTimeout(function () {
                    resolve();
                  }, 1000);
                }),
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

import MultiStepFormWizard from "@/lib/core/features/MultiStepFormWizard";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import styled from "styled-components/native";
import OrganizationLogoStep from "./OrganizationLogoStep";
import OrganizationNameStep from "./OrganizationNameStep";

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
          currentIndex={0}
          steps={[
            {
              render: () => <OrganizationNameStep />,
              onNext: async () =>
                new Promise((resolve) => {
                  global.setTimeout(function () {
                    resolve();
                  }, 1000);
                }),
            },
            {
              render: () => <OrganizationLogoStep />,
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

import MultiStepFormWizard from "@/lib/core/features/MultiStepFormWizard";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import styled from "styled-components/native";
import OrganizationLogoStep from "./OrganizationLogoStep";
import OrganizationNameStep from "./OrganizationNameStep";
import { useOrganizationOnboarding } from "../hooks/useOrganizationOnboarding";
import { MultiStepFormWizardProvider } from "@/lib/core/providers/MultiStepFormWizardProvider";

export default function OrganizationOnboarding() {
  const router = useRouter();
  const organizationOnboarding = useOrganizationOnboarding();

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
        {!!organizationOnboarding && (
          <MultiStepFormWizardProvider
            currentIndex={organizationOnboarding.currentStep || 0}
          >
            <MultiStepFormWizard
              key={organizationOnboarding?._id}
              steps={[
                {
                  render: () => <OrganizationNameStep />,
                },
                {
                  render: () => <OrganizationLogoStep />,
                },
              ]}
            />
          </MultiStepFormWizardProvider>
        )}

        <ActivityIndicator size="large" animating={!organizationOnboarding} />
      </OrganizationOnboardingContainer>
    </>
  );
}

const OrganizationOnboardingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

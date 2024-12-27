import MultiStepFormWizard from "@/lib/core/features/MultiStepFormWizard";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import styled from "styled-components/native";
import OrganizationLogoStep from "./OrganizationLogoStep";
import OrganizationNameStep from "./OrganizationNameStep";
import { useOrganizationOnboarding } from "../hooks/useOrganizationOnboarding";
import { MultiStepFormWizardProvider } from "@/lib/core/providers/MultiStepFormWizardProvider";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  WithSafeAreaInsetsProps,
} from "react-native-safe-area-context";
import { View } from "react-native";

export default function OrganizationOnboarding() {
  const router = useRouter();
  const organizationOnboarding = useOrganizationOnboarding();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <Appbar.Header elevated>
        <Appbar.BackAction
          onPress={() =>
            router.canGoBack() ? router.back() : router.navigate("/")
          }
        ></Appbar.BackAction>
        <Appbar.Content title="Registar nueva escuela"></Appbar.Content>
      </Appbar.Header>
      {!organizationOnboarding && (
        <ActivityIndicator
          size="large"
          style={{ height: "100%" }}
          animating={!organizationOnboarding}
        />
      )}
      <OrganizationOnboardingContainer insets={insets}>
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
      </OrganizationOnboardingContainer>
    </SafeAreaProvider>
  );
}

const OrganizationOnboardingContainer = styled(View)<WithSafeAreaInsetsProps>`
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${(props) => props.insets.bottom}px;
  align-items: flex-start;
`;

import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useOrganizationOnboarding } from "../hooks/useOrganizationOnboarding";
import { useAction } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { useClerk } from "@clerk/clerk-react";
import { useMultiStepFormWizard } from "@/lib/core/hooks/useMultiStepFormWizard";

export default function OrganizationFinishStep() {
  const router = useRouter();
  const orgOnboarding = useOrganizationOnboarding();
  const { setCurrentStepIndex, currentStepIndex, setLoading } =
    useMultiStepFormWizard();
  const clerk = useClerk();

  if (orgOnboarding?.organizationId) {
    clerk.setActive({
      session: clerk.session,
      organization: orgOnboarding.organizationId,
    });
  }

  const nextStepOrganizationOnboarding = useAction(
    api.organizationOnboarding.nextStepOrganizationOnboarding,
  );

  const onFinish = async () => {
    if (orgOnboarding && clerk.organization) {
      setLoading(true);
      await nextStepOrganizationOnboarding({
        id: orgOnboarding._id,
        organizationId: clerk.organization.id,
        currentStep: currentStepIndex,
        finished: true,
      });
      setLoading(false);
      setCurrentStepIndex(0);

      await router.navigate("/");
    }
  };
  return (
    <OrganizationFinishStepWrapper>
      <Text variant="titleMedium">Terminado!</Text>
      <Button onPress={onFinish}>Finalizar</Button>
    </OrganizationFinishStepWrapper>
  );
}

const OrganizationFinishStepWrapper = styled(View)`
  justify-content: center;
  flex: 1;
  align-items: center;
`;

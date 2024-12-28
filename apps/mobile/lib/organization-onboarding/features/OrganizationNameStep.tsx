import {
  MultiStepFormWizardActionsContainer,
  MultiStepFormWizardNextActions,
} from "@/lib/core/features/MultiStepFormWizard";
import { useMultiStepFormWizard } from "@/lib/core/hooks/useMultiStepFormWizard";
import { spacing } from "@/theme/spacing";
import React from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useAction } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { useClerk } from "@clerk/clerk-react";
import { useOrganizationOnboarding } from "../hooks/useOrganizationOnboarding";

export default function OrganizationNameStep() {
  const { setLoading, setCurrentStepIndex, currentStepIndex } =
    useMultiStepFormWizard();
  const nextStepOrganizationOnboarding = useAction(
    api.organizationOnboarding.nextStepOrganizationOnboarding,
  );
  const orgOnboarding = useOrganizationOnboarding();

  const { control, handleSubmit } = useForm<{
    organizationName: string;
  }>();
  const clerk = useClerk();

  const onSubmit = async (data: { organizationName: string }) => {
    setLoading(true);

    const organizationResource = await clerk.createOrganization({
      name: data.organizationName,
    });

    await nextStepOrganizationOnboarding({
      id: orgOnboarding!._id,
      organizationId: organizationResource.id,
      currentStep: 1,
      finished: false,
    });

    await clerk.user?.reload();
    await clerk.setActive({ organization: organizationResource.id });

    setLoading(false);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <OrganizationNameStepWrapper>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          Introduce el nombre de tu escuela
        </Text>
        <Controller
          control={control}
          rules={{ required: true, minLength: 3 }}
          name="organizationName"
          render={({ field, fieldState }) => {
            return (
              <>
                <OrganizationNameStepTextInput
                  style={{ width: "100%" }}
                  label="Nombre de escuela"
                  error={fieldState.error}
                  value={field.value}
                  onChangeText={field.onChange}
                />
                <HelperText type="error" visible={!!fieldState.error}>
                  Introduce el nombre de la escuela para continuar
                </HelperText>
              </>
            );
          }}
        />
      </OrganizationNameStepWrapper>
      <MultiStepFormWizardActionsContainer>
        <MultiStepFormWizardNextActions>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            elevation={2}
          >
            Continuar
          </Button>
        </MultiStepFormWizardNextActions>
      </MultiStepFormWizardActionsContainer>
    </>
  );
}

const OrganizationNameStepWrapper = styled(View)`
  justify-content: center;
  flex: 1;
  align-items: center;
`;

const OrganizationNameStepTextInput = styled(TextInput)`
  width: 100%;
  margin-top: ${spacing * 2}px;
`;

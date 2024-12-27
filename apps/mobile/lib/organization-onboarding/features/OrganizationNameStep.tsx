import {
  MultiStepFormWizardActionsContainer,
  MultiStepFormWizardNextActions,
} from "@/lib/core/features/MultiStepFormWizard";
import { useMultiStepFormWizard } from "@/lib/core/hooks/useMultiStepFormWizard";
import { spacing } from "@/theme/spacing";
import React from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";

export default function OrganizationNameStep() {
  const [name, setName] = React.useState("");
  const { setLoading } = useMultiStepFormWizard();

  return (
    <>
      <OrganizationNameStepWrapper>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          Introduce el nombre de tu escuela
        </Text>
        <OrganizationNameStepTextInput
          style={{ width: "100%" }}
          label="Nombre de escuela"
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
      </OrganizationNameStepWrapper>
      <MultiStepFormWizardActionsContainer>
        <MultiStepFormWizardNextActions>
          <Button
            mode="contained"
            onPress={() => setLoading(true)}
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

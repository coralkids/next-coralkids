import React from "react";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button, Text } from "react-native-paper";
import { ThemeStyledProps } from "styled-components/native";
import { View } from "react-native";
import {
  MultiStepFormWizardActionsContainer,
  MultiStepFormWizardNextActions,
} from "@/lib/core/features/MultiStepFormWizard";
import { useMultiStepFormWizard } from "@/lib/core/hooks/useMultiStepFormWizard";

export default function OrganizationLogoStep() {
  const { setCurrentStepIndex, currentStepIndex } = useMultiStepFormWizard();

  return (
    <>
      <OrganizationLogoStepStepWrapper>
        <Text variant="titleLarge">Sube tu logo</Text>
        <OrganizationLogoStepStepLogoImage
          source={require("@/assets/images/icon.png")}
        />
        <OrganizationLogoStepStepUploadLogoButton icon="upload" mode="elevated">
          Subir logo
        </OrganizationLogoStepStepUploadLogoButton>
      </OrganizationLogoStepStepWrapper>
      <MultiStepFormWizardActionsContainer>
        <MultiStepFormWizardNextActions>
          <Button mode="contained" elevation={2}>
            Continuar
          </Button>
        </MultiStepFormWizardNextActions>
        <Button
          style={{
            height: 40,
            display: "flex",
            justifyContent: "flex-end",
          }}
          mode="outlined"
          onPress={() => setCurrentStepIndex(currentStepIndex - 1)}
        >
          Anterior
        </Button>
      </MultiStepFormWizardActionsContainer>
    </>
  );
}

const OrganizationLogoStepStepWrapper = styled(View)`
  justify-content: center;
  flex: 1;
  align-items: center;
`;

const OrganizationLogoStepStepUploadLogoButton = styled(Button)`
  margin-top: ${spacing * 2}px;
`;

const OrganizationLogoStepStepLogoImage = styled(Image)`
  border: 2px;
  border-color: ${(props: ThemeStyledProps) =>
    props.theme.colors.secondaryContainer};
  border-radius: 12px;
  width: 200px;
  margin-top: ${spacing}px;
  height: 200px;
`;

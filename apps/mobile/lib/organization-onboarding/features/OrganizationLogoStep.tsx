import React, { useState } from "react";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button, Text } from "react-native-paper";
import { ThemeStyledProps } from "styled-components/native";
import { Platform, View } from "react-native";
import {
  MultiStepFormWizardActionsContainer,
  MultiStepFormWizardNextActions,
} from "@/lib/core/features/MultiStepFormWizard";
import { useMultiStepFormWizard } from "@/lib/core/hooks/useMultiStepFormWizard";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useOrganizationOnboarding } from "../hooks/useOrganizationOnboarding";
import { useClerk } from "@clerk/clerk-react";
import { useAction } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export default function OrganizationLogoStep() {
  const { setCurrentStepIndex, currentStepIndex, setLoading } =
    useMultiStepFormWizard();
  const orgOnboarding = useOrganizationOnboarding();
  const clerk = useClerk();

  const nextStepOrganizationOnboarding = useAction(
    api.organizationOnboarding.nextStepOrganizationOnboarding,
  );

  if (orgOnboarding?.organizationId) {
    clerk.setActive({ organization: orgOnboarding.organizationId });
  }

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(
    undefined,
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const nextStep = async () => {
    if (image && clerk.organization && image.uri && orgOnboarding) {
      setLoading(true);

      try {
        const base64Image =
          Platform.OS !== "web"
            ? await FileSystem.readAsStringAsync(image.uri, {
                encoding: "base64",
              })
            : null;

        await clerk.organization.setLogo({
          file:
            Platform.OS !== "web"
              ? `data:${image.mimeType};base64,` + base64Image
              : image.uri,
        });

        await nextStepOrganizationOnboarding({
          id: orgOnboarding._id,
          organizationId: clerk.organization.id,
          currentStep: currentStepIndex + 1,
          finished: false,
        });

        setLoading(false);

        setCurrentStepIndex(currentStepIndex + 1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onSkip = async () => {
    setLoading(true);

    if (orgOnboarding && clerk.organization) {
      await nextStepOrganizationOnboarding({
        id: orgOnboarding._id,
        organizationId: clerk.organization.id,
        currentStep: currentStepIndex + 1,
        finished: false,
      });
    }

    setLoading(false);

    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <OrganizationLogoStepStepWrapper>
        <Text variant="titleLarge">Sube tu logo</Text>
        <OrganizationLogoStepStepLogoImage
          source={
            image
              ? { uri: image.uri }
              : clerk.organization
                ? { uri: clerk.organization.imageUrl }
                : require("@/assets/images/icon.png")
          }
        />
        <OrganizationLogoStepStepUploadLogoButton
          onPress={pickImage}
          icon="upload"
          mode="elevated"
        >
          Subir logo
        </OrganizationLogoStepStepUploadLogoButton>
      </OrganizationLogoStepStepWrapper>
      <MultiStepFormWizardActionsContainer>
        <MultiStepFormWizardNextActions>
          <Button onPress={onSkip} mode="text">
            Saltar paso
          </Button>
          <Button
            onPress={nextStep}
            disabled={!image}
            mode="contained"
            elevation={2}
          >
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

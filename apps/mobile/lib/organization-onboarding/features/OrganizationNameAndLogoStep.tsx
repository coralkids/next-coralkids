import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button } from "react-native-paper";
import MultiStepFormWizardStep from "@/lib/core/features/MultiStepFormWizardStep";
import { ThemeStyledProps } from "styled-components/native";

export default function OrganizationNameAndLogoStep() {
  return (
    <MultiStepFormWizardStep>
      <OrganizationNameAndLogoStepLogoImage
        source={require("@/assets/images/icon.png")}
      />
      <OrganizationNameAndLogoStepUploadLogoButton
        icon="upload"
        mode="elevated"
      >
        Cambiar logo
      </OrganizationNameAndLogoStepUploadLogoButton>
    </MultiStepFormWizardStep>
  );
}

const OrganizationNameAndLogoStepUploadLogoButton = styled(Button)`
  margin-top: ${spacing * 2}px;
`;

const OrganizationNameAndLogoStepLogoImage = styled(Image)`
  flex: 1;
  border: 2px;
  border-color: ${(props: ThemeStyledProps) =>
    props.theme.colors.secondaryContainer};
  border-radius: 12px;
  width: 200px;
  height: 200px;
`;

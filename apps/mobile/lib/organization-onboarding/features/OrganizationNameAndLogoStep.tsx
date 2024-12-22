import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button } from "react-native-paper";
import { ThemeStyledProps } from "styled-components/native";
import { View } from "react-native";

export default function OrganizationNameAndLogoStep() {
  return (
    <OrganizationNameAndLogoStepWrapper>
      <OrganizationNameAndLogoStepLogoImage
        source={require("@/assets/images/icon.png")}
      />
      <OrganizationNameAndLogoStepUploadLogoButton
        icon="upload"
        mode="elevated"
      >
        Cambiar logo
      </OrganizationNameAndLogoStepUploadLogoButton>
    </OrganizationNameAndLogoStepWrapper>
  );
}

const OrganizationNameAndLogoStepWrapper = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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

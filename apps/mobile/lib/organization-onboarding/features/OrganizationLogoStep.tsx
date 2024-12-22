import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button, Text } from "react-native-paper";
import { ThemeStyledProps } from "styled-components/native";
import { View } from "react-native";

export default function OrganizationLogoStep() {
  return (
    <OrganizationLogoStepStepWrapper>
      <Text variant="titleLarge">Sube tu logo</Text>
      <OrganizationLogoStepStepLogoImage
        source={require("@/assets/images/icon.png")}
      />
      <OrganizationLogoStepStepUploadLogoButton icon="upload" mode="elevated">
        Cambiar logo
      </OrganizationLogoStepStepUploadLogoButton>
    </OrganizationLogoStepStepWrapper>
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
  height: 200px;
`;

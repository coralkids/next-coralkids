import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { spacing } from "@/theme/spacing";
import { Button } from "react-native-paper";

export default function OrganizationNameAndLogoStep() {
  return (
    <OrganizationNameAndLogoStepWrapper
      entering={FadeInRight.delay(0)}
      exiting={FadeOutLeft.delay(0)}
    >
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

const OrganizationNameAndLogoStepUploadLogoButton = styled(Button)`
  margin-top: ${spacing * 2}px;
`;

const OrganizationNameAndLogoStepWrapper = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${spacing}px;
`;

const OrganizationNameAndLogoStepLogoImage = styled(Image)`
  flex: 1;
  border: 2px;
  border-color: ${(props) => props.theme.colors.secondaryContainer};
  border-radius: 12px;
  width: 200px;
  height: 200px;
`;

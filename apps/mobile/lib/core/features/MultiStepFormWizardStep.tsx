import { spacing } from "@/theme/spacing";
import React from "react";
import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
} from "react-native-reanimated";
import styled from "styled-components/native";

export default function MultiStepFormWizardStep({
  children,
}: React.PropsWithChildren) {
  return (
    <MultiStepFormWizardStepWrapper
      entering={LightSpeedInRight.delay(100)}
      exiting={LightSpeedOutLeft}
    >
      {children}
    </MultiStepFormWizardStepWrapper>
  );
}

const MultiStepFormWizardStepWrapper = styled(Animated.View)`
  padding: ${spacing}px;
  height: 100%;
  flex: 1;
`;

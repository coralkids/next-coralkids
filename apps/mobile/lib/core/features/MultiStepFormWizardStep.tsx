import { spacing } from "@/theme/spacing";
import React from "react";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import styled from "styled-components/native";

export default function MultiStepFormWizardStep({
  children,
}: React.PropsWithChildren) {
  return (
    <MultiStepFormWizardStepWrapper
      entering={SlideInRight}
      exiting={SlideOutLeft}
    >
      {children}
    </MultiStepFormWizardStepWrapper>
  );
}

const MultiStepFormWizardStepWrapper = styled(Animated.View)`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${spacing}px;
`;

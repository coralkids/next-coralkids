import { spacing } from "@/theme/spacing";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import styled, { ThemeStyledProps } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MultiStepFormWizardStep from "./MultiStepFormWizardStep";
import { useMultiStepFormWizard } from "../hooks/useMultiStepFormWizard";

interface Step {
  render: () => React.ReactNode;
}

interface MultiStepFormWizardProps extends React.PropsWithChildren {
  steps: Step[];
  showProgressBar?: boolean;
}

export default function MultiStepFormWizard({
  steps,
  showProgressBar = true,
}: MultiStepFormWizardProps) {
  const { loading, currentStepIndex } = useMultiStepFormWizard();

  const currentStep = useMemo(
    () => steps[currentStepIndex],
    [currentStepIndex, steps],
  );

  const insets = useSafeAreaInsets();
  /**
  const onNextStepPress = async () => {
    if (currentStep.onNext) {
      setLoading(true);
      await currentStep.onNext();
      setLoading(false);
    }

    if (currentStepIndex < steps.length - 1) {
      goNext();
    }

    if (currentStepIndex === steps.length - 1 && onFinish) {
      setCurrentStepIndex(currentIndex);
      setLoading(false);
      await onFinish();
    }
  };
  const onPreviusStatePress = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const goNext = () => setCurrentStepIndex(currentStepIndex + 1);
   */

  const progress = useMemo(
    () => parseFloat(((currentStepIndex + 1) / steps.length).toFixed(2)),
    [currentStepIndex, steps],
  );

  return (
    <MultiStepFormWizardWrapper insets={insets}>
      {showProgressBar && (
        <View>
          <ProgressBar progress={progress} />
        </View>
      )}
      <MultiStepFormWizardStepLoaderWrapper>
        <ActivityIndicator
          style={{ position: "absolute" }}
          size="large"
          animating={loading}
        />
      </MultiStepFormWizardStepLoaderWrapper>
      <MultiStepFormWizardStepContainer isLoading={loading}>
        <MultiStepFormWizardStep key={currentStepIndex}>
          {currentStep.render()}
        </MultiStepFormWizardStep>
      </MultiStepFormWizardStepContainer>
    </MultiStepFormWizardWrapper>
  );
}

const MultiStepFormWizardStepLoaderWrapper = styled(View)`
  flex: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

interface MultiStepFormWizardStepContainerProps extends ThemeStyledProps {
  isLoading: boolean;
}

const MultiStepFormWizardStepContainer = styled(
  View,
)<MultiStepFormWizardStepContainerProps>`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: column;
  opacity: ${(props: MultiStepFormWizardStepContainerProps) =>
    props.isLoading ? 0.05 : 1};
`;

const MultiStepFormWizardWrapper = styled(View)<WithSafeAreaInsetsProps>`
  flex: 1;
  width: 100%;
  height: 100%;
  margin-bottom: ${(props: WithSafeAreaInsetsProps) => props.insets.bottom}px;
`;

export const MultiStepFormWizardActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row-reverse;
  padding: ${spacing}px;
`;

export const MultiStepFormWizardNextActions = styled(View)`
  flex-direction: column;
  gap: ${spacing}px;
`;

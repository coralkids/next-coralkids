import { spacing } from "@/theme/spacing";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, ProgressBar } from "react-native-paper";
import { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import styled, { ThemeStyledProps } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MultiStepFormWizardStep from "./MultiStepFormWizardStep";

interface Step {
  render: () => React.ReactNode;
  canSkip?: boolean;
  onNext?: () => Promise<void>;
}

interface MultiStepFormWizardProps extends React.PropsWithChildren {
  steps: Step[];
  showProgressBar?: boolean;
  currentIndex?: number;
  onFinish?: () => Promise<void>;
}

export default function MultiStepFormWizard({
  steps,
  onFinish,
  showProgressBar = true,
  currentIndex = 0,
}: MultiStepFormWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(currentIndex);
  const [loading, setLoading] = React.useState(false);
  const currentStep = useMemo(
    () => steps[currentStepIndex],
    [currentStepIndex, steps],
  );

  const insets = useSafeAreaInsets();

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

  const goNext = () => setCurrentStepIndex(currentStepIndex + 1);

  const onPreviusStatePress = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const progress = useMemo(
    () => parseFloat(((currentStepIndex + 1) / steps.length).toFixed(2)),
    [currentStepIndex, steps],
  );

  return (
    <>
      <View>{showProgressBar && <ProgressBar progress={progress} />}</View>
      <MultiStepFormWizardWrapper insets={insets}>
        <MultiStepFormWizardStepLoaderWrapper>
          <ActivityIndicator
            style={{ position: "absolute" }}
            size="large"
            animating={loading}
          />
        </MultiStepFormWizardStepLoaderWrapper>
        <MultiStepFormWizardStepContainer
          isLoading={loading}
          contentContainerStyle={{ flex: 1 }}
        >
          <MultiStepFormWizardStep key={currentStepIndex}>
            {currentStep.render()}
          </MultiStepFormWizardStep>
        </MultiStepFormWizardStepContainer>
        <MultiStepFormWizardActionsContainer>
          <MultiStepFormWizardNextActions>
            {currentStepIndex < steps.length - 1 && currentStep.canSkip && (
              <Button disabled={loading} onPress={goNext} mode="text">
                Saltar
              </Button>
            )}
            {currentStepIndex <= steps.length && (
              <Button
                disabled={loading}
                onPress={onNextStepPress}
                mode="contained"
                elevation={2}
              >
                Continuar
              </Button>
            )}
          </MultiStepFormWizardNextActions>
          {currentStepIndex > 0 && (
            <Button
              style={{
                height: 40,
                display: "flex",
                justifyContent: "flex-end",
              }}
              mode="outlined"
              disabled={loading}
              onPress={onPreviusStatePress}
            >
              Anterior
            </Button>
          )}
        </MultiStepFormWizardActionsContainer>
      </MultiStepFormWizardWrapper>
    </>
  );
}

const MultiStepFormWizardStepLoaderWrapper = styled(View)`
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
`;

interface MultiStepFormWizardStepContainerProps extends ThemeStyledProps {
  isLoading: boolean;
}

const MultiStepFormWizardStepContainer = styled(
  ScrollView,
)<MultiStepFormWizardStepContainerProps>`
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: ${spacing}px;
  opacity: ${(props: MultiStepFormWizardStepContainerProps) =>
    props.isLoading ? 0.05 : 1};
`;

const MultiStepFormWizardWrapper = styled(View)<WithSafeAreaInsetsProps>`
  flex: 1;
  height: 100%;
  padding-bottom: ${(props: WithSafeAreaInsetsProps) => props.insets.bottom}px;
`;

const MultiStepFormWizardActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row-reverse;
  padding: ${spacing}px;
`;

const MultiStepFormWizardNextActions = styled(View)`
  flex-direction: column;
  gap: ${spacing}px;
`;

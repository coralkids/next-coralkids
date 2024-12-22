import { spacing } from "@/theme/spacing";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { WithSafeAreaInsetsProps } from "react-native-safe-area-context";
import styled, { ThemeStyledProps } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Step {
  render: (currentStep: number) => React.ReactNode;
  canSkip?: boolean;
  onNext?: () => Promise<void>;
}

interface MultiStepFormWizardProps extends React.PropsWithChildren {
  steps: Step[];
  showProgressBar?: boolean;
  currentIndex?: number;
}

export default function MultiStepFormWizard({
  steps,
  showProgressBar = true,
  currentIndex = 0,
}: MultiStepFormWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(currentIndex);
  const [loading, setLoading] = React.useState(false);

  const insets = useSafeAreaInsets();

  const onNextStepPress = async () => {
    if (steps[currentStepIndex].onNext) {
      setLoading(true);
      await steps[currentStepIndex].onNext();
      setLoading(false);
    }

    goNext();
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
        {!!steps && steps.length > 0 && !!steps[currentStepIndex] && (
          <Animated.View
            style={{ flex: 1 }}
            entering={FadeInRight.delay(200)}
            exiting={FadeInLeft.delay(299)}
          >
            <MultiStepFormWizardStepContainer isLoading={loading}>
              {steps[currentStepIndex].render(currentStepIndex)}
            </MultiStepFormWizardStepContainer>
          </Animated.View>
        )}
        <MultiStepFormWizardActionsContainer>
          {currentStepIndex === steps.length - 1 && (
            <Button
              style={{ marginTop: 50 }}
              disabled={loading}
              loading={loading}
              mode="contained"
            >
              Finalizar
            </Button>
          )}
          <MultiStepFormWizardNextActions>
            {currentStepIndex < steps.length - 1 &&
              steps[currentStepIndex].canSkip && (
                <Button disabled={loading} onPress={goNext} mode="text">
                  Saltar
                </Button>
              )}
            {currentStepIndex < steps.length - 1 && (
              <Button
                disabled={loading}
                loading={loading}
                onPress={onNextStepPress}
                mode="contained"
                elevation={2}
              >
                Siguiente
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

interface MultiStepFormWizardStepContainerProps extends ThemeStyledProps {
  isLoading: boolean;
}

const MultiStepFormWizardStepContainer = styled(
  Animated.ScrollView,
)<MultiStepFormWizardStepContainerProps>`
  flex: 1;
  padding: ${spacing}px;
  opacity: ${(props: MultiStepFormWizardStepContainerProps) =>
    props.isLoading ? 0.5 : 1};
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

import { spacing } from "@/theme/spacing";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

interface Step {
  render: (currentStep: number) => React.ReactNode;
  canSkip?: boolean;
  onNext?: () => Promise<void>;
}

interface MultiStepFormWizardProps extends React.PropsWithChildren {
  steps: Step[];
  showProgressBar?: boolean;
}

export default function MultiStepFormWizard({
  steps,
  showProgressBar = true,
}: MultiStepFormWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

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

      <MultiStepFormWizardWrapper>
        {!!steps && steps.length > 0 && !!steps[currentStepIndex] && (
          <MultiStepFormWizardStepContainer
            isLoading={loading}
            entering={FadeInRight.delay(200)}
            exiting={FadeInLeft.delay(299)}
          >
            {steps[currentStepIndex].render(currentStepIndex)}
          </MultiStepFormWizardStepContainer>
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
                <Button disabled={loading} onPress={goNext} mode="outlined">
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
                height: "auto",
                justifyContent: "flex-end",
              }}
              mode="text"
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

const MultiStepFormWizardStepContainer = styled(Animated.ScrollView)<{
  isLoading: boolean;
}>`
  flex: 1;
  height: 100%;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

const MultiStepFormWizardWrapper = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  padding: ${spacing}px;
  background-color: ${(props) => props.theme.colors.onPrimary};
`;

const MultiStepFormWizardActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: ${spacing}px;
`;

const MultiStepFormWizardNextActions = styled(View)`
  flex-direction: column;
  gap: ${spacing}px;
`;

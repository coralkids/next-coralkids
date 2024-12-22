import { spacing } from "@/theme/spacing";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import {
  SafeAreaView,
  WithSafeAreaInsetsProps,
} from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  padding: ${spacing}px;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

const MultiStepFormWizardWrapper = styled(View)<WithSafeAreaInsetsProps>`
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.colors.onPrimary};
  padding-bottom: ${(props) => props.insets.bottom}px;
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

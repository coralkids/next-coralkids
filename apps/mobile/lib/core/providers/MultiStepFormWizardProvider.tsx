import React from "react";
import { createContext } from "react";

export const MultiStepFormWizardContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<number>;
}>({
  loading: false,
  setLoading: () => {},
  setCurrentStepIndex: () => {},
  currentStepIndex: 0,
});

export const MultiStepFormWizardProvider: React.FC<
  React.PropsWithChildren<{ currentIndex: number }>
> = ({ currentIndex, children }) => {
  const [loading, setLoading] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(
    currentIndex || 0,
  );

  return (
    <MultiStepFormWizardContext.Provider
      value={{ loading, setLoading, currentStepIndex, setCurrentStepIndex }}
    >
      {children}
    </MultiStepFormWizardContext.Provider>
  );
};

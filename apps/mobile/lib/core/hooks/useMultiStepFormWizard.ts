import { useContext } from "react";
import { MultiStepFormWizardContext } from "../providers/MultiStepFormWizardProvider";

export const useMultiStepFormWizard = () => {
  const ctx = useContext(MultiStepFormWizardContext);

  return ctx;
};

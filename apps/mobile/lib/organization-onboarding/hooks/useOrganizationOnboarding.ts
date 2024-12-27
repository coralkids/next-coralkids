import { useContext } from "react";
import { OrganizationOnboardingContext } from "../providers/OrganizationOnboardingProvider";

export const useOrganizationOnboarding = () => {
  const ctx = useContext(OrganizationOnboardingContext);

  return ctx;
};

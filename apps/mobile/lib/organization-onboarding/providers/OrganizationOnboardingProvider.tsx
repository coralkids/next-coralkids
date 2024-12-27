import { api } from "@packages/backend/convex/_generated/api";
import { Doc, Id } from "@packages/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { createContext } from "react";

export const OrganizationOnboardingContext = createContext<
  Doc<"organizationOnboarding"> | null | undefined
>(undefined);

export const OrganizationOnboardingProvider: React.FC<
  React.PropsWithChildren<{ id: Id<"organizationOnboarding"> }>
> = ({ children, id }) => {
  const organizationOnboarding = useQuery(
    api.organizationOnboarding.getOrganizationOnboarding,
    { id: id },
  );

  return (
    <OrganizationOnboardingContext.Provider value={organizationOnboarding}>
      {children}
    </OrganizationOnboardingContext.Provider>
  );
};

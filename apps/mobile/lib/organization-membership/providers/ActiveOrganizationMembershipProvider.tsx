import useUser from "@/lib/user/hooks/useUser";
import { useClerk } from "@clerk/clerk-react";
import { OrganizationMembershipResource } from "@clerk/types";
import React, { createContext, useMemo } from "react";

export const ActiveOrganizationMembershipContext = createContext<
  | {
      activeOrganizationMembership?: OrganizationMembershipResource;
    }
  | undefined
>(undefined);

const ActiveOrganizationMembershipProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const user = useUser();

  const clerk = useClerk();
  const activeOrganizationMembership = useMemo(() => {
    return user?.organizationMemberships.find(
      (om) => om.organization.id === clerk.organization?.id,
    );
  }, [clerk.organization, user?.organizationMemberships]);

  return (
    <ActiveOrganizationMembershipContext.Provider
      value={{ activeOrganizationMembership }}
    >
      {children}
    </ActiveOrganizationMembershipContext.Provider>
  );
};

export default ActiveOrganizationMembershipProvider;

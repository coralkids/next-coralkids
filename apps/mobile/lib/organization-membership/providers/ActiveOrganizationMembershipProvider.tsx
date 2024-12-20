import useUser from "@/lib/user/hooks/useUser";
import { OrganizationMembershipResource } from "@clerk/types";
import React, { createContext, useState } from "react";

export const ActiveOrganizationMembershipContext = createContext<
  | {
      activeOrganizationMembership?: OrganizationMembershipResource;
      setActiveOrganizationMembership: React.Dispatch<OrganizationMembershipResource>;
    }
  | undefined
>(undefined);

const ActiveOrganizationMembershipProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const user = useUser();
  const [activeOrganizationMembership, setActiveOrganizationMembership] =
    useState(user?.organizationMemberships?.at(0));

  return (
    <ActiveOrganizationMembershipContext.Provider
      value={{ activeOrganizationMembership, setActiveOrganizationMembership }}
    >
      {children}
    </ActiveOrganizationMembershipContext.Provider>
  );
};

export default ActiveOrganizationMembershipProvider;
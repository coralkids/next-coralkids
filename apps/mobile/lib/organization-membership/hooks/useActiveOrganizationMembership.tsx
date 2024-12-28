import { useContext } from "react";
import { ActiveOrganizationMembershipContext } from "../providers/ActiveOrganizationMembershipProvider";

export const useActiveOrganizationMembership = () => {
  const ctx = useContext(ActiveOrganizationMembershipContext);

  if (!ctx) {
    throw "ActiveOrganizationMembershipProvider is required";
  }

  const { activeOrganizationMembership } = ctx;

  return {
    activeOrganizationMembership,
  };
};

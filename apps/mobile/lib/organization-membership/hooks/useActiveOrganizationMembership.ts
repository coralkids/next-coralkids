import useUser from "@/lib/user/hooks/useUser";
import { useClerk } from "@clerk/clerk-expo";
import { useMemo } from "react";

export const useActiveOrganizationMembership = () => {
  const clerk = useClerk();
  const user = useUser();

  const activeOrganizationMembership = useMemo(() => {
    if (!user?.organizationMemberships) {
      return undefined;
    }

    if (!clerk.organization) {
      return user.organizationMemberships[0];
    }

    return user.organizationMemberships.find(
      (om) => om.organization.id === clerk.organization!.id,
    );
  }, [clerk, user]);

  return activeOrganizationMembership;
};

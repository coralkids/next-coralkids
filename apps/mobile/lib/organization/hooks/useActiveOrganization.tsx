import useUser from "@/lib/user/hooks/useUser";
import { useState } from "react";

export const useActiveOrganization = () => {
  const user = useUser();
  const [activeOrganization, setActiveOrganization] = useState(
    user?.organizationMemberships?.at(0),
  );

  return {
    activeOrganization,
    setActiveOrganization,
  };
};

import { useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import React, { createContext } from "react";

export const UserContext = createContext<UserResource | undefined | null>(
  undefined,
);

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

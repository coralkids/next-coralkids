import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

const useUser = () => {
  const ctx = useContext(UserContext);

  return ctx;
};

export default useUser;

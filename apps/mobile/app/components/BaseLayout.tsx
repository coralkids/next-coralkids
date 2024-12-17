import React from "react";
import useLoadResources from "../hooks/useLoadResources";

export const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  useLoadResources();

  return children;
};

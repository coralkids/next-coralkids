import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Button, useTheme } from "react-native-paper";

export const LogoutButton: React.FC = (props) => {
  const { signOut } = useAuth();
  const theme = useTheme();

  return (
    <Button
      textColor={theme.colors.error}
      buttonColor={theme.colors.errorContainer}
      mode="elevated"
      icon="logout"
      onPress={() => signOut()}
      {...props}
    >
      Salir
    </Button>
  );
};

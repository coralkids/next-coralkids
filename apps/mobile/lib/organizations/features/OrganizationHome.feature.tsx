import { LogoutButton } from "@/lib/core/ui/LogoutButton";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const { user } = useUser();

  return (
    <>
      <Appbar.Header>
        <LogoutButton />
        <Appbar.Content title={`${user?.firstName} ${user?.lastName}`} />
      </Appbar.Header>

      <View>
        <Text>Prueba</Text>
      </View>
    </>
  );
};

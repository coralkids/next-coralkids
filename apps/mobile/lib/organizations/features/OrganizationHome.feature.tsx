import { LogoutButton } from "@/lib/core/ui/LogoutButton";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const { user } = useUser();

  return (
    <>
      <Appbar.Header elevated>
        <LogoutButton />
        <ProfileAvatarImage size={40} source={{ uri: user?.imageUrl }} />
      </Appbar.Header>
      <Text>Prueba</Text>
    </>
  );
};

const ProfileAvatarImage = styled(Avatar.Image)`
  margin-left: 10px;
`;

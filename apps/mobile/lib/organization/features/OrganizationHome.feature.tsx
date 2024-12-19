import { LogoutButton } from "@/lib/core/ui/LogoutButton";
import useUser from "@/lib/user/hooks/useUser";
import React from "react";
import { Appbar, Avatar, Text } from "react-native-paper";
import styled from "styled-components/native";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();

  console.log(user);

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

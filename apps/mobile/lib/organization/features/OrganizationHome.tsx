import useUser from "@/lib/user/hooks/useUser";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Divider,
  Menu,
  Text,
} from "react-native-paper";
import styled from "styled-components/native";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();
  const auth = useAuth();

  const [userMenuVisible, setUserMenuVisible] = useState(false);

  return (
    <>
      <Appbar.Header>
        <ProfileTouchableOpacity onPress={() => setUserMenuVisible(true)}>
          <ProfileAvatarImage size={40} source={{ uri: user?.imageUrl }} />
          <ProfileFullName variant="labelMedium">
            {user?.firstName} {user?.lastName}
          </ProfileFullName>
        </ProfileTouchableOpacity>
        <ProfileMenu
          visible={userMenuVisible}
          onDismiss={() => setUserMenuVisible(false)}
          anchor={
            <AntDesign
              size={20}
              onPress={() => setUserMenuVisible(true)}
              name="down"
            ></AntDesign>
          }
        >
          <LogountButton
            onPress={() => auth.signOut()}
            icon="logout"
            mode="contained-tonal"
          >
            Salir
          </LogountButton>
        </ProfileMenu>
      </Appbar.Header>
      <Text>Prueba</Text>
    </>
  );
};

const ProfileAvatarImage = styled(Avatar.Image)`
  margin-left: 10px;
`;

const ProfileFullName = styled(Text)`
  margin-left: 10px;
`;

const ProfileTouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileMenu = styled(Menu)`
  margin-left: -100;
  margin-top: 35;
`;

const LogountButton = styled(Button)`
  margin: 10px;
`;

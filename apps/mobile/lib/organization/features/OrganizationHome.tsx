import useUser from "@/lib/user/hooks/useUser";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, Button, Menu, Text } from "react-native-paper";
import styled from "styled-components/native";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();
  const auth = useAuth();

  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  return (
    <>
      <Appbar.Header elevated>
        <ProfileTouchableOpacity onPress={() => setIsUserMenuVisible(true)}>
          <ProfileAvatarImage size={40} source={{ uri: user?.imageUrl }} />
          <ProfileFullName variant="labelMedium">
            {user?.firstName} {user?.lastName}
          </ProfileFullName>
        </ProfileTouchableOpacity>
        <ProfileMenu
          visible={isUserMenuVisible}
          onDismiss={() => setIsUserMenuVisible(false)}
          anchor={
            <ProfileMenuOpenIcon
              size={15}
              onPress={() => setIsUserMenuVisible(true)}
              name={isUserMenuVisible ? "up" : "down"}
            ></ProfileMenuOpenIcon>
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
      <Container>
        {user?.organizationMemberships.map((org) => (
          <View>
            <Text>{org.organization.name}</Text>
          </View>
        ))}
      </Container>
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

const ProfileMenuOpenIcon = styled(AntDesign)`
  margin-left: 5px;
  margin-top: 2px;
`;

const ProfileMenu = styled(Menu)`
  margin-left: -100;
  margin-top: 50;
`;

const LogountButton = styled(Button)`
  margin: 10px;
`;

const Container = styled(View)`
  flex: 1;
  padding: 10px;
`;

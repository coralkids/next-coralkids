import useUser from "@/lib/user/hooks/useUser";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, Button, Card, Menu, Text } from "react-native-paper";
import styled from "styled-components/native";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();
  const auth = useAuth();

  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  console.log(user?.organizationMemberships[0].organization);

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
          <Card>
            <Card.Content>
              <OrganizationContainer>
                <OrganizationAvatarImage
                  size={100}
                  source={{
                    uri: org.organization.imageUrl,
                    headers: { Accept: "image/*" },
                  }}
                />
                <Text variant="titleMedium">{org.organization.name}</Text>
              </OrganizationContainer>
            </Card.Content>
          </Card>
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
  margin-left: -100px;
  margin-top: 50px;
`;

const LogountButton = styled(Button)`
  margin: 10px;
`;

const Container = styled(View)`
  flex: 1;
  padding: 10px;
`;

const OrganizationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const OrganizationAvatarImage = styled(Image)`
  border-radius: 0px;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

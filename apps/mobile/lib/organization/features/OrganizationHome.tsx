import useUser from "@/lib/user/hooks/useUser";
import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();

  return (
    <>
      <Appbar.Header>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <Container>
        <SelectedOrganizationTitle variant="titleMedium">
          Escuela
        </SelectedOrganizationTitle>
        {user?.organizationMemberships.map((org) => (
          <Card>
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
          </Card>
        ))}
      </Container>
    </>
  );
};

const SelectedOrganizationTitle = styled(Text)`
  margin-bottom: 10px;
`;

const Container = styled(View)`
  flex: 1;
  padding: 10px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const OrganizationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const OrganizationAvatarImage = styled(Image)`
  border-radius: 0px;
  background-color: white;
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

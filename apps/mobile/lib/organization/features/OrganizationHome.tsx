import useUser from "@/lib/user/hooks/useUser";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";
import OrganizationMembershipItem from "./components/OrganizationMembershipItem";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();

  return (
    <>
      <Appbar.Header elevated>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <Container>
        <OrganizationListContainer>
          <SelectedOrganizationTitle variant="titleMedium">
            Organizacion
          </SelectedOrganizationTitle>
          <Button icon="swap-horizontal">Cambiar de organizacion</Button>
        </OrganizationListContainer>

        {user?.organizationMemberships.map((org) => (
          <OrganizationMembershipItem key={org.id} org={org} />
        ))}
      </Container>
    </>
  );
};

const OrganizationListContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`;

const SelectedOrganizationTitle = styled(Text)`
  align-items: center;
`;

const Container = styled(View)`
  flex: 1;
  padding: 15px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

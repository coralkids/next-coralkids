import useUser from "@/lib/user/hooks/useUser";
import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";
import OrganizationMembershipItem from "./components/OrganizationMembershipItem";

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
          <OrganizationMembershipItem key={org.id} org={org} />
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

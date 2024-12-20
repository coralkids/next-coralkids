import useUser from "@/lib/user/hooks/useUser";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";
import OrganizationMembershipItem from "./components/OrganizationMembershipItem";
import Container from "@/lib/core/ui/Container";
import { spacing } from "@/theme/spacing";

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
          <Button
            onPress={() => console.log("change org")}
            icon="swap-horizontal"
          >
            Cambiar
          </Button>
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
  width: 100%;
  padding: ${spacing}px 0px;
`;

const SelectedOrganizationTitle = styled(Text)`
  align-items: center;
  padding: 0px ${spacing}px;
`;

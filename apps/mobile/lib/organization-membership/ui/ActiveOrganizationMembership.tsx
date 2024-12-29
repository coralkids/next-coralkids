import React from "react";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";
import { spacing } from "@/theme/spacing";
import { OrganizationMembershipResource } from "@clerk/types";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import OrganizationMembershipItem from "./OrganizationMembershipItem";
import { View } from "react-native";

export default function ActiveOrganizationMembership({
  activeOrganizationMembership,
  onChangePress,
}: {
  activeOrganizationMembership?: OrganizationMembershipResource;
  onChangePress: () => void;
}) {
  return (
    <>
      <OrganizationMembershipListHeaderContainer>
        <SelectedOrganizationMembershipTitle variant="titleMedium">
          Escuela
        </SelectedOrganizationMembershipTitle>
        {activeOrganizationMembership && (
          <Button mode="text" onPress={onChangePress} icon="swap-horizontal">
            Cambiar de escuela
          </Button>
        )}
      </OrganizationMembershipListHeaderContainer>
      <OrganizationMembershipListContainer>
        {activeOrganizationMembership && (
          <AnimatedFullWidthView key={activeOrganizationMembership.id}>
            <OrganizationMembershipItem
              org={activeOrganizationMembership}
              displayConfig={activeOrganizationMembership.role === "org:admin"}
            />
          </AnimatedFullWidthView>
        )}
        {!activeOrganizationMembership && (
          <>
            <Text variant="bodyMedium">
              No hay ninguna escuela seleccionada actualmente.
            </Text>
            <OrganizationMembershipButtonSelect
              mode="contained-tonal"
              onPress={onChangePress}
              icon="account-group"
            >
              Seleccionar escuela
            </OrganizationMembershipButtonSelect>
          </>
        )}
      </OrganizationMembershipListContainer>
    </>
  );
}

const OrganizationMembershipButtonSelect = styled(Button)`
  margin-top: ${spacing}px;
`;

const OrganizationMembershipListHeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing}px;
`;

const OrganizationMembershipListContainer = styled(View)`
  padding: 0px ${spacing}px;
`;

const SelectedOrganizationMembershipTitle = styled(Text)`
  align-items: center;
`;

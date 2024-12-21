import React from "react";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";
import { spacing } from "@/theme/spacing";
import { OrganizationMembershipResource } from "@clerk/types";
import { Button, Text } from "react-native-paper";
import { FadeIn, FadeInLeft, FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";
import OrganizationMembershipItem from "./OrganizationMembershipItem";

export default function ActiveOrganizationMembership({
  activeOrganizationMembership,
  onChangePress,
}: {
  activeOrganizationMembership?: OrganizationMembershipResource;
  onChangePress: () => void;
}) {
  return (
    <>
      <OrganizationMembershipListHeaderContainer entering={FadeIn.delay(100)}>
        <SelectedOrganizationMembershipTitle variant="titleMedium">
          Organizacion
        </SelectedOrganizationMembershipTitle>
        <Button mode="elevated" onPress={onChangePress} icon="swap-horizontal">
          Cambiar
        </Button>
      </OrganizationMembershipListHeaderContainer>
      <OrganizationMembershipListContainer>
        {activeOrganizationMembership && (
          <AnimatedFullWidthView
            exiting={FadeInLeft.delay(100)}
            entering={FadeInRight.delay(100)}
          >
            <OrganizationMembershipItem
              org={activeOrganizationMembership}
              displayConfig={activeOrganizationMembership.role === "org:admin"}
            />
          </AnimatedFullWidthView>
        )}
      </OrganizationMembershipListContainer>
    </>
  );
}

const OrganizationMembershipListHeaderContainer = styled(AnimatedFullWidthView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing}px;
`;

const OrganizationMembershipListContainer = styled(AnimatedFullWidthView)`
  padding: 0px ${spacing}px;
`;

const SelectedOrganizationMembershipTitle = styled(Text)`
  align-items: center;
`;

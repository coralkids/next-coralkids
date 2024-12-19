import React from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { View } from "react-native";
import { Image } from "expo-image";
import { Card, Text } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";

export const OrganizationMembershipItem: React.FC<{
  org: OrganizationMembershipResource;
}> = ({ org }) => {
  return (
    <OrganizationMembershipCard>
      <OrganizationMembershipItemContainer>
        <OrganizationMembershipItemAvatarWrapper>
          <OrganizationMembershipItemAvatarImage
            size={100}
            source={{
              uri: org.organization.imageUrl,
              headers: { Accept: "image/*" },
            }}
          />
        </OrganizationMembershipItemAvatarWrapper>

        <Text variant="titleMedium">{org.organization.name}</Text>
      </OrganizationMembershipItemContainer>
    </OrganizationMembershipCard>
  );
};

export default OrganizationMembershipItem;

const OrganizationMembershipCard = styled(Card)`
  width: 100%;
`;

const OrganizationMembershipItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;
const OrganizationMembershipItemAvatarWrapper = styled(View)`
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.elevation.level3};
  padding: 10px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
const OrganizationMembershipItemAvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;

import React from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Badge, Card, Icon, Text, useTheme } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";
import { spacing } from "@/theme/spacing";

export const OrganizationMembershipItem: React.FC<{
  org: OrganizationMembershipResource;
}> = ({ org }) => {
  const theme = useTheme();

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
        <OrganizationMembershipItemContent>
          <OrganizationMembershipItemTextWrapper>
            <Text variant="titleMedium">{org.organization.name}</Text>
            <Text variant="bodyMedium">Escuela infantil</Text>
            <View style={{ alignSelf: "flex-start" }}>
              <Badge
                style={{
                  backgroundColor: theme.colors.primary,
                  marginTop: 10,
                }}
              >
                {org.role}
              </Badge>
            </View>
          </OrganizationMembershipItemTextWrapper>
          <OrganizationMembershipItemConfigurationTouchable onPress={() => {}}>
            <Icon source="cog" color={theme.colors.primary} size={20} />
          </OrganizationMembershipItemConfigurationTouchable>
        </OrganizationMembershipItemContent>
      </OrganizationMembershipItemContainer>
    </OrganizationMembershipCard>
  );
};

export default OrganizationMembershipItem;

const OrganizationMembershipItemConfigurationTouchable = styled(
  TouchableOpacity,
)`
  padding: 10px;
  border-radius: 100%;
`;

const OrganizationMembershipItemTextWrapper = styled(View)`
  max-width: 500px;
`;

const OrganizationMembershipCard = styled(Card)`
  width: 100%;
`;

const OrganizationMembershipItemContent = styled(View)`
  float: left;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing}px;
  flex: 1;
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

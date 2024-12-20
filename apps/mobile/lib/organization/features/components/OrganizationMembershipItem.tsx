import React from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Badge, Card, Icon, Text, useTheme } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";
import { spacing } from "@/theme/spacing";

export const OrganizationMembershipItem: React.FC<{
  org: OrganizationMembershipResource;
  elevation?: number;
  displayConfig?: boolean;
}> = ({ org, displayConfig = false, elevation = 1 }) => {
  const theme = useTheme();

  return (
    <OrganizationMembershipCard elevation={elevation}>
      <OrganizationMembershipItemContainer>
        <OrganizationMembershipItemAvatarWrapper elevation={elevation}>
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
          {displayConfig && (
            <OrganizationMembershipItemConfigurationTouchable
              onPress={() => {}}
            >
              <Icon source="cog" color={theme.colors.primary} size={20} />
            </OrganizationMembershipItemConfigurationTouchable>
          )}
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
  flex: 1;
  padding-left: ${spacing / 2}px;
  padding-right: ${spacing}px;
`;

const OrganizationMembershipItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const OrganizationMembershipItemAvatarWrapper = styled(View)`
  padding: ${spacing}px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
const OrganizationMembershipItemAvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-color: ${({ theme }: ThemeStyledProps) => theme.colors.background};
`;

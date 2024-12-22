import React from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import {
  Badge,
  Card,
  Chip,
  Icon,
  IconButton,
  MD3Elevation,
  Text,
  useTheme,
} from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";
import { spacing } from "@/theme/spacing";

export const OrganizationMembershipItem: React.FC<{
  org: OrganizationMembershipResource;
  elevation?: MD3Elevation;
  displayConfig?: boolean;
  isActive?: boolean;
}> = ({
  org,
  displayConfig = false,
  elevation = 1 as MD3Elevation,
  isActive = false,
}) => {
  const theme = useTheme();

  return (
    <OrganizationMembershipCard isActive={isActive} elevation={elevation}>
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
              <Chip>{org.role}</Chip>
            </View>
          </OrganizationMembershipItemTextWrapper>
          {displayConfig && (
            <IconButton
              onPress={() => console.log("open org config")}
              icon="cog"
              mode="contained-tonal"
              size={20}
            />
          )}
        </OrganizationMembershipItemContent>
      </OrganizationMembershipItemContainer>
    </OrganizationMembershipCard>
  );
};

export default OrganizationMembershipItem;

const OrganizationMembershipItemTextWrapper = styled(View)`
  max-width: 500px;
`;

const OrganizationMembershipCard = styled(Card)<{
  isActive: boolean;
}>`
  width: 100%;
  border-width: ${(props) => (props.isActive ? "1px" : "0px")};
  border-color: ${(props) => props.theme.colors.primary};
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
  flex-direction: row;
`;
const OrganizationMembershipItemAvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-color: ${({ theme }: ThemeStyledProps) => theme.colors.background};
`;

import React from "react";
import OrganizationMembershipItem from "./OrganizationMembershipItem";
import { Button, Text, useTheme } from "react-native-paper";
import { spacing } from "@/theme/spacing";
import { TouchableOpacity, View } from "react-native";
import { OrganizationMembershipResource } from "@clerk/types";
import styled, { ThemeStyledProps } from "styled-components/native";
import Container from "@/lib/core/ui/Container";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";

interface OrganizationMembershipSelectorProps {
  onPress: (orgMembership: OrganizationMembershipResource) => void;
  organizationMemberships?: OrganizationMembershipResource[];
}

export const OrganizationMembershipSelector: React.FC<
  OrganizationMembershipSelectorProps
> = ({ onPress, organizationMemberships = [] }) => {
  const theme = useTheme();

  return (
    <Container>
      <OrganizationMembershipSelectorWrapper>
        <OrganizationMembershipSelectorTitle entering={FadeIn.delay(100)}>
          <Text variant="titleMedium">Organizaciones vinculadas</Text>
        </OrganizationMembershipSelectorTitle>
        <Animated.FlatList
          itemLayoutAnimation={FadeIn.delay(100)}
          style={{ width: "100%", height: "auto" }}
          data={organizationMemberships}
          renderItem={({ item, index }) => {
            return (
              <AnimatedFullWidthView
                entering={FadeInRight.delay((index + 1) * 150)}
              >
                <TouchableOrganizationMembershipItem
                  key={item.id}
                  style={{}}
                  onPress={() => onPress(item)}
                >
                  <OrganizationMembershipItem org={item} />
                </TouchableOrganizationMembershipItem>
              </AnimatedFullWidthView>
            );
          }}
        ></Animated.FlatList>
        <AddOrganizationMembershipActionsContainer>
          <Button
            onPress={() => console.log("Create org")}
            buttonColor={theme.colors.tertiaryContainer}
            textColor={theme.colors.tertiary}
            mode="elevated"
            icon="plus"
          >
            Vincular nueva organizacion
          </Button>
        </AddOrganizationMembershipActionsContainer>
      </OrganizationMembershipSelectorWrapper>
    </Container>
  );
};

export default OrganizationMembershipSelector;

const AddOrganizationMembershipActionsContainer = styled(View)`
  margin-top: ${spacing}px;
`;

const OrganizationMembershipSelectorTitle = styled(AnimatedFullWidthView)`
  margin-bottom: ${spacing}px;
  margin-left: ${spacing / 2}px;
`;

const OrganizationMembershipSelectorWrapper = styled(View)`
  flex: 1;
  padding: ${spacing}px;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 20px;
  background-color: ${({ theme }: ThemeStyledProps) => theme.colors.background};
`;

const TouchableOrganizationMembershipItem = styled(TouchableOpacity)`
  padding: ${spacing / 2}px;
`;

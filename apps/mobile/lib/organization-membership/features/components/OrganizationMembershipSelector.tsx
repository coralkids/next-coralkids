import React from "react";
import OrganizationMembershipItem from "./OrganizationMembershipItem";
import { Text } from "react-native-paper";
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
  return (
    <Container>
      <OrganizationMembershipSelectorWrapper>
        <OrganizationMembershipSelectorTitle variant="titleMedium">
          Organizaciones disponibles
        </OrganizationMembershipSelectorTitle>
        <Animated.FlatList
          itemLayoutAnimation={FadeIn.delay(100)}
          style={{ width: "100%", height: "100%" }}
          data={organizationMemberships}
          renderItem={({ item, index }) => {
            return (
              <AnimatedFullWidthView
                entering={FadeInRight.delay(
                  index === 0 ? 100 : (index + 1) * 200,
                )}
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
      </OrganizationMembershipSelectorWrapper>
    </Container>
  );
};

export default OrganizationMembershipSelector;

const OrganizationMembershipSelectorTitle = styled(Text)`
  margin-bottom: ${spacing}px;
  margin-left: ${spacing / 2}px;
`;

const OrganizationMembershipSelectorWrapper = styled(View)`
  flex: 1;
  padding: ${spacing}px;
  border-radius: 12px;
  width: 100%;
  background-color: ${({ theme }: ThemeStyledProps) => theme.colors.background};
`;

const TouchableOrganizationMembershipItem = styled(TouchableOpacity)`
  padding: ${spacing / 2}px;
`;

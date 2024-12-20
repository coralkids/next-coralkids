import React from "react";
import OrganizationMembershipItem from "./OrganizationMembershipItem";
import { Button, FAB, Portal, Text, useTheme } from "react-native-paper";
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

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <OrganizationMembershipSelectorContainer>
      <OrganizationMembershipSelectorWrapper>
        <OrganizationMembershipSelectorTitle entering={FadeIn.delay(100)}>
          <Text variant="titleMedium">Organizaciones vinculadas</Text>
        </OrganizationMembershipSelectorTitle>
        <Animated.FlatList
          itemLayoutAnimation={FadeIn.delay(100)}
          data={organizationMemberships}
          renderItem={({ item, index }) => {
            return (
              <AnimatedFullWidthView
                entering={FadeInRight.delay((index + 1) * 150)}
              >
                <TouchableOrganizationMembershipItem
                  key={item.id}
                  onPress={() => onPress(item)}
                >
                  <OrganizationMembershipItem org={item} />
                </TouchableOrganizationMembershipItem>
              </AnimatedFullWidthView>
            );
          }}
        ></Animated.FlatList>
        <FAB.Group
          label="Vincular nueva organizacion"
          open={open}
          visible
          icon={open ? "link-variant-minus" : "link-variant-plus"}
          actions={[
            {
              icon: "qrcode",
              label: "Escanear QR",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "plus",
              label: "Crear nueva",
              onPress: () => console.log("Pressed email"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </OrganizationMembershipSelectorWrapper>
    </OrganizationMembershipSelectorContainer>
  );
};

export default OrganizationMembershipSelector;

const OrganizationMembershipSelectorContainer = styled(View)`
  padding: 0px;
  flex: 1;
`;

const OrganizationMembershipSelectorTitle = styled(AnimatedFullWidthView)`
  padding: ${spacing}px;
`;

const OrganizationMembershipSelectorWrapper = styled(View)`
  flex: 1;
  border-radius: 12px;
`;

const TouchableOrganizationMembershipItem = styled(TouchableOpacity)`
  padding: ${spacing}px;
`;

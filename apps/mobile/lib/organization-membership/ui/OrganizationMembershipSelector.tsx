import React from "react";
import OrganizationMembershipItem from "./OrganizationMembershipItem";
import { FAB, Text } from "react-native-paper";
import { spacing } from "@/theme/spacing";
import { TouchableOpacity, View } from "react-native";
import { OrganizationMembershipResource } from "@clerk/types";
import styled from "styled-components/native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OrganizationMembershipSelectorProps {
  onPress: (orgMembership: OrganizationMembershipResource) => void;
  organizationMemberships?: OrganizationMembershipResource[];
  activeOrganizationMembership?: OrganizationMembershipResource;
  onCreateOrganizationPress: () => void;
}

export const OrganizationMembershipSelector: React.FC<
  OrganizationMembershipSelectorProps
> = ({
  onPress,
  activeOrganizationMembership,
  onCreateOrganizationPress,
  organizationMemberships = [],
}) => {
  const [state, setState] = React.useState({ open: false });
  const insets = useSafeAreaInsets();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <OrganizationMembershipSelectorContainer>
      <OrganizationMembershipSelectorWrapper>
        <OrganizationMembershipSelectorTitle entering={FadeIn.delay(100)}>
          <Text variant="titleMedium">Mis escuelas</Text>
        </OrganizationMembershipSelectorTitle>
        <Animated.FlatList
          style={{ marginBottom: insets.bottom }}
          itemLayoutAnimation={FadeIn.delay(100)}
          data={organizationMemberships}
          renderItem={({ item, index }) => {
            return (
              <OrganizationMembershipItemContainer
                entering={FadeInRight.delay((index + 1) * 250)}
              >
                <TouchableOrganizationMembershipItem
                  key={item.id}
                  disabled={item.id === activeOrganizationMembership?.id}
                  onPress={() => onPress(item)}
                >
                  <OrganizationMembershipItem
                    isActive={item.id === activeOrganizationMembership?.id}
                    org={item}
                  />
                </TouchableOrganizationMembershipItem>
              </OrganizationMembershipItemContainer>
            );
          }}
        ></Animated.FlatList>
        <FAB.Group
          label="Vincular nueva escuela"
          open={open}
          visible
          icon={open ? "link-variant-minus" : "link-variant-plus"}
          actions={[
            {
              icon: "link",
              label: "Introducir código",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "qrcode",
              label: "Escanear QR",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "plus",
              label: "Registrar nueva",
              onPress: onCreateOrganizationPress,
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
  height: "100%";
  border-radius: 12px;
`;

const TouchableOrganizationMembershipItem = styled(TouchableOpacity)`
  padding: ${spacing}px;
`;

const OrganizationMembershipItemContainer = styled(AnimatedFullWidthView)`
  height: "100%";
`;

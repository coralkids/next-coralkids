import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";
import OrganizationMembershipItem from "./components/OrganizationMembershipItem";
import Container from "@/lib/core/ui/Container";
import { spacing } from "@/theme/spacing";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ThemeStyledProps } from "styled-components/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FadeInRight } from "react-native-reanimated";
import { OrganizationMembershipResource } from "@clerk/types";
import { OrganizationMembershipSelector } from "./components/OrganizationMembershipSelector";
import { useActiveOrganizationMembership } from "../hooks/useActiveOrganizationMembership";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";

export const OrganizationMembershipHome: React.FC<
  React.PropsWithChildren
> = () => {
  const user = useUser();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const snapPoints = useMemo(() => ["100%"], []);
  const onOrganizationChange = (
    orgMembership: OrganizationMembershipResource,
  ) => {
    setActiveOrganizationMembership(orgMembership);

    bottomSheetRef?.current?.close();
  };
  const { activeOrganizationMembership, setActiveOrganizationMembership } =
    useActiveOrganizationMembership();

  return (
    <>
      <Appbar.Header dark={true} elevated>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <OrganizationMembershipListContainer>
              <SelectedOrganizationMembershipTitle variant="titleMedium">
                Organizacion
              </SelectedOrganizationMembershipTitle>
              <Button
                onPress={() => handlePresentModalPress()}
                icon="swap-horizontal"
              >
                Cambiar
              </Button>
            </OrganizationMembershipListContainer>
            {activeOrganizationMembership && (
              <AnimatedFullWidthView entering={FadeInRight.delay(100)}>
                <OrganizationMembershipItem
                  org={activeOrganizationMembership}
                  displayConfig={
                    activeOrganizationMembership.role === "org:admin"
                  }
                />
              </AnimatedFullWidthView>
            )}
          </Container>
          <BottomSheetModalProvider>
            <BottomSheetModal
              animateOnMount={true}
              enablePanDownToClose
              backgroundComponent={
                OrganizationMembershipSelectorBottomSheetPanArea as FC
              }
              snapPoints={snapPoints}
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
            >
              <OrganizationMembershipSelector
                organizationMemberships={user?.organizationMemberships}
                onPress={onOrganizationChange}
              />
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default OrganizationMembershipHome;

const OrganizationMembershipListContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${spacing}px 0px;
`;

const SelectedOrganizationMembershipTitle = styled(Text)`
  align-items: center;
`;

const OrganizationMembershipSelectorBottomSheetPanArea = styled(
  BottomSheetView,
)`
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.primaryContainer};
`;

import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
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
import { FadeIn, FadeInLeft, FadeInRight } from "react-native-reanimated";
import { OrganizationMembershipResource } from "@clerk/types";
import { OrganizationMembershipSelector } from "./components/OrganizationMembershipSelector";
import { useActiveOrganizationMembership } from "../hooks/useActiveOrganizationMembership";
import AnimatedFullWidthView from "@/lib/core/ui/AnimatedFullWidthView";

export const OrganizationMembershipHome: React.FC<
  React.PropsWithChildren
> = () => {
  const user = useUser();
  const { activeOrganizationMembership, setActiveOrganizationMembership } =
    useActiveOrganizationMembership();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);

  const onOrganizationChange = (
    orgMembership: OrganizationMembershipResource,
  ) => {
    setActiveOrganizationMembership(orgMembership);

    bottomSheetRef?.current?.close();
  };

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <Appbar.Header dark={true} elevated>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <OrganizationMembershipListContainer entering={FadeIn.delay(100)}>
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
              <AnimatedFullWidthView
                exiting={FadeInLeft.delay(100)}
                entering={FadeInRight.delay(100)}
              >
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

const OrganizationMembershipListContainer = styled(AnimatedFullWidthView)`
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
  padding: 0px;
  margin: 0px;
  background-color: ${({ theme }: ThemeStyledProps) => theme.colors.background};
  border-top-width: 25px;
  border-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.elevation.level2};
`;

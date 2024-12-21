import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { Appbar, Button, Card, Icon, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "../../core/features/ProfileTouchableWithMenu";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ThemeStyledProps } from "styled-components/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { OrganizationMembershipResource } from "@clerk/types";
import { useActiveOrganizationMembership } from "../hooks/useActiveOrganizationMembership";
import ActiveOrganizationMembership from "../ui/ActiveOrganizationMembership";
import OrganizationMembershipSelector from "../ui/OrganizationMembershipSelector";
import OrganizationMembershipEmpty from "../ui/OrganizationMembershipEmpty";
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
          {!!user?.organizationMemberships?.length && (
            <ActiveOrganizationMembership
              activeOrganizationMembership={activeOrganizationMembership}
              onChangePress={handlePresentModalPress}
            />
          )}
          {user?.organizationMemberships?.length === 0 && (
            <OrganizationMembershipEmpty />
          )}
          {!!user?.organizationMemberships?.length && (
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
                  activeOrganizationMembership={activeOrganizationMembership}
                  organizationMemberships={user?.organizationMemberships}
                  onPress={onOrganizationChange}
                />
              </BottomSheetModal>
            </BottomSheetModalProvider>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default OrganizationMembershipHome;

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

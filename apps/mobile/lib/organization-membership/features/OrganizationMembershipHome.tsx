import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { Appbar, Banner, useTheme } from "react-native-paper";
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
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { AntDesign } from "@expo/vector-icons";

export function OrganizationMembershipHome() {
  const user = useUser();
  const router = useRouter();
  const startOnboarding = useMutation(
    api.organizationOnboarding.startOnboarding,
  );
  const unfinishedOnboarding = useQuery(
    api.organizationOnboarding.getUnfinishedOrganizationOnboarding,
  );

  const theme = useTheme();

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

  const onCreateOrganizationPress = () => {
    startOnboarding().then((obId) => {
      router.navigate(`/organization-onboarding/${obId}`);
    });
  };

  return (
    <>
      <Appbar.Header elevated>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <SafeAreaProvider>
        <OrganizationMembershipHomeWrapper style={{ flex: 1 }}>
          <Banner
            visible={!!unfinishedOnboarding}
            actions={[
              {
                label: "Completar registro",
                onPress: () =>
                  router.navigate(
                    `/organization-onboarding/${unfinishedOnboarding?._id}`,
                  ),
              },
            ]}
            icon={({ size }) => (
              <AntDesign
                name="warning"
                size={size}
                color={theme.colors.error}
              />
            )}
          >
            Todavía no has completado el proceso de registro de tu escuela
          </Banner>

          {!!user?.organizationMemberships?.length && (
            <ActiveOrganizationMembership
              activeOrganizationMembership={activeOrganizationMembership}
              onChangePress={handlePresentModalPress}
            />
          )}
          {user?.organizationMemberships?.length === 0 && (
            <OrganizationMembershipEmpty
              onCreateOrganizationPress={onCreateOrganizationPress}
            />
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
                  onCreateOrganizationPress={onCreateOrganizationPress}
                  activeOrganizationMembership={activeOrganizationMembership}
                  organizationMemberships={user?.organizationMemberships}
                  onPress={onOrganizationChange}
                />
              </BottomSheetModal>
            </BottomSheetModalProvider>
          )}
        </OrganizationMembershipHomeWrapper>
      </SafeAreaProvider>
    </>
  );
}

export default OrganizationMembershipHome;

const OrganizationMembershipHomeWrapper = styled(SafeAreaView)``;

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

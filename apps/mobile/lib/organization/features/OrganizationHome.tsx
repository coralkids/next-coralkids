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
import Animated, { FadeInRight } from "react-native-reanimated";
import { OrganizationMembershipResource } from "@clerk/types";
import OrganizationSelector from "./components/OrganizationSelector";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const snapPoints = useMemo(() => ["100%"], []);
  const onOrganizationChange = (org: OrganizationMembershipResource) => {
    console.log("selected org", org.organization.name);

    bottomSheetRef?.current?.close();
  };
  return (
    <>
      <Appbar.Header elevated>
        <ProfileTouchableWithMenu />
      </Appbar.Header>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <OrganizationListContainer>
              <SelectedOrganizationTitle variant="titleMedium">
                Organizacion
              </SelectedOrganizationTitle>
              <Button
                onPress={() => handlePresentModalPress()}
                icon="swap-horizontal"
              >
                Cambiar
              </Button>
            </OrganizationListContainer>
            {user?.organizationMemberships[0] && (
              <Animated.View entering={FadeInRight} style={{ width: "100%" }}>
                <OrganizationMembershipItem
                  org={user?.organizationMemberships[0]}
                  displayConfig={
                    user?.organizationMemberships[0].role === "org:admin"
                  }
                />
              </Animated.View>
            )}
          </Container>
          <BottomSheetModalProvider>
            <BottomSheetModal
              animateOnMount={true}
              enablePanDownToClose
              backgroundComponent={OrganizationSelectorBottomSheetPanArea as FC}
              snapPoints={snapPoints}
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
            >
              <OrganizationSelector
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

const OrganizationListContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${spacing}px 0px;
`;

const SelectedOrganizationTitle = styled(Text)`
  align-items: center;
`;

const OrganizationSelectorBottomSheetPanArea = styled(BottomSheetView)`
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.primaryContainer};
`;

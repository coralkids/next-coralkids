import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import ProfileTouchableWithMenu from "./components/ProfileTouchableWithMenu";
import OrganizationMembershipItem from "./components/OrganizationMembershipItem";
import Container from "@/lib/core/ui/Container";
import { spacing } from "@/theme/spacing";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemeStyledProps } from "styled-components/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const OrganizationHome: React.FC<React.PropsWithChildren> = () => {
  const user = useUser();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const snapPoints = useMemo(() => ["50%", "100%"], []);

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
              <Button onPress={() => handleSnapPress(0)} icon="swap-horizontal">
                Cambiar
              </Button>
            </OrganizationListContainer>

            {user?.organizationMemberships.map((org) => (
              <OrganizationMembershipItem
                key={org.id}
                org={org}
                displayConfig={org.role === "org:admin"}
              />
            ))}
          </Container>
          <BottomSheet
            enablePanDownToClose
            backgroundComponent={OrganizationSelectorContainer as FC}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
          >
            <OrganizationSelectorWrapper>
              {user?.organizationMemberships.map((org) => (
                <OrganizationMembershipItem key={org.id} org={org} />
              ))}
            </OrganizationSelectorWrapper>
          </BottomSheet>
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

const OrganizationSelectorWrapper = styled(View)`
  flex: 1;
  padding: ${spacing}px;
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.elevation.level1};
`;

const SelectedOrganizationTitle = styled(Text)`
  align-items: center;
  padding: 0px ${spacing}px;
`;

const OrganizationSelectorContainer = styled(BottomSheetView)`
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors.elevation.level5};
  padding: ${spacing}px;
`;

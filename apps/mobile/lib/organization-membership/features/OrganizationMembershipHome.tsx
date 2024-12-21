import useUser from "@/lib/user/hooks/useUser";
import React, { FC, useCallback, useMemo, useRef } from "react";
import { Appbar, Button, Icon, useTheme } from "react-native-paper";
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
import { Text } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { spacing } from "@/theme/spacing";
export const OrganizationMembershipHome: React.FC<
  React.PropsWithChildren
> = () => {
  const user = useUser();
  const { activeOrganizationMembership, setActiveOrganizationMembership } =
    useActiveOrganizationMembership();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const theme = useTheme();

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
            <OrganizationMembershipEmpty entering={FadeIn.delay(100)}>
              <OrganizationMembershipEmptyTextTitle variant="titleMedium">
                <Icon
                  color={theme.colors.secondary}
                  source="school"
                  size={24}
                />{" "}
                &nbsp; Soy lider de escuela
              </OrganizationMembershipEmptyTextTitle>
              <OrganizationMembershipEmptyText variant="bodyMedium">
                En ese caso bienvenido, estamos muy contentos de tenerte con
                nosotros, puedes empezar el proceso de alta directamente desde
                aquí, o puedes contactar con nosotros si necesitas más
                información.
              </OrganizationMembershipEmptyText>
              <OrganizationMembershipCreateOrganization
                icon="plus"
                mode="elevated"
              >
                Registrar escuela
              </OrganizationMembershipCreateOrganization>
              <OrganizationMembershipCreateOrganization
                icon="calendar"
                mode="contained-tonal"
              >
                Solicitar una demostración
              </OrganizationMembershipCreateOrganization>
              <OrganizationMembershipEmptyTextTitle
                style={{ marginTop: spacing }}
                variant="titleMedium"
              >
                <Icon
                  color={theme.colors.secondary}
                  source="account-child"
                  size={24}
                />{" "}
                &nbsp; Soy familiar o profesor
              </OrganizationMembershipEmptyTextTitle>
              <OrganizationMembershipEmptyText variant="bodyMedium">
                Si tienes un codigo de invitacion usa el boton de abajo para
                introducirlo o también si tienes un QR puedes escanearlo.
              </OrganizationMembershipEmptyText>
              <OrganizationMembershipEmptyText variant="bodyMedium">
                Pide al lider de la escuela que te invite, despues puedes volver
                a entrar para disfurtar de la app.
              </OrganizationMembershipEmptyText>

              <OrganizationMembershipCreateOrganization
                icon="link"
                mode="elevated"
              >
                Vincular escuela con código
              </OrganizationMembershipCreateOrganization>
              <OrganizationMembershipCreateOrganization
                icon="qrcode"
                mode="elevated"
              >
                Escanear QR
              </OrganizationMembershipCreateOrganization>
            </OrganizationMembershipEmpty>
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

const OrganizationMembershipCreateOrganization = styled(Button)`
  margin-top: ${spacing}px;
`;

const OrganizationMembershipEmpty = styled(Animated.ScrollView)`
  padding: ${spacing}px;
  width: 100%;
`;

const OrganizationMembershipEmptyText = styled(Text)`
  padding: ${spacing}px;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const OrganizationMembershipEmptyTextTitle = styled(
  OrganizationMembershipEmptyText,
)`
  color: ${(props) => props.theme.colors.secondary};
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

import { spacing } from "@/theme/spacing";
import { Platform, ScrollView } from "react-native";
import { Button, Card, Icon, useTheme, Text } from "react-native-paper";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

interface OrganizationMembershipEmptyProps {
  onCreateOrganizationPress: () => void;
}

export default function OrganizationMembershipEmpty({
  onCreateOrganizationPress,
}: OrganizationMembershipEmptyProps) {
  const theme = useTheme();

  return (
    <OrganizationMembershipEmptyContainer
      contentContainerStyle={{
        alignItems: Platform.OS === "web" ? "center" : undefined,
      }}
    >
      <Animated.View entering={FadeInRight.delay(200)}>
        <OrganizationMembershipEmptyCard>
          <OrganizationMembershipEmptyTextTitle variant="titleMedium">
            <Icon
              color={theme.colors.secondary}
              source="account-box"
              size={24}
            />
            &nbsp; Soy responsable de escuela
          </OrganizationMembershipEmptyTextTitle>
          <OrganizationMembershipEmptyText variant="bodyMedium">
            Estamos muy contentos de tenerte con nosotros, puedes empezar el
            proceso de alta directamente desde aquí, o puedes contactar con
            nosotros si necesitas más información.
          </OrganizationMembershipEmptyText>
          <OrganizationMembershipCreateOrganization icon="calendar" mode="text">
            Solicitar una demostración
          </OrganizationMembershipCreateOrganization>
          <OrganizationMembershipCreateOrganization
            icon="plus"
            onPress={onCreateOrganizationPress}
            mode="contained-tonal"
          >
            Registrar escuela
          </OrganizationMembershipCreateOrganization>
        </OrganizationMembershipEmptyCard>
      </Animated.View>
      <Animated.View entering={FadeInRight.delay(600)}>
        <OrganizationMembershipEmptyCard>
          <OrganizationMembershipEmptyTextTitle
            style={{ marginTop: spacing }}
            variant="titleMedium"
          >
            <Icon
              color={theme.colors.secondary}
              source="account-child"
              size={24}
            />
            &nbsp; Soy familiar o profesor
          </OrganizationMembershipEmptyTextTitle>
          <OrganizationMembershipEmptyText variant="bodyMedium">
            Si tienes un código de invitación usa el boton de abajo para
            introducirlo o también si tienes un QR puedes escanearlo. Si no
            tienes nada de esto, contacta con el lider de tu escuela para que te
            invite.
          </OrganizationMembershipEmptyText>

          <OrganizationMembershipCreateOrganization icon="link" mode="text">
            Vincular escuela con código
          </OrganizationMembershipCreateOrganization>
          <OrganizationMembershipCreateOrganization
            icon="qrcode"
            mode="contained-tonal"
            elevation={2}
          >
            Escanear QR
          </OrganizationMembershipCreateOrganization>
        </OrganizationMembershipEmptyCard>
      </Animated.View>
    </OrganizationMembershipEmptyContainer>
  );
}
const OrganizationMembershipEmptyCard = styled(Card)`
  padding: ${spacing}px;
  margin: ${spacing}px 0px;
  max-width: 425px;
`;

const OrganizationMembershipCreateOrganization = styled(Button)`
  margin-top: ${spacing}px;
`;

const OrganizationMembershipEmptyContainer = styled(ScrollView)`
  padding: ${spacing}px;
  width: 100%;
  flex: 1;
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

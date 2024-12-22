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
          <OrganizationMembershipEmptyTextTitle
            variant="titleMedium"
            isPrimary={true}
          >
            <Icon color={theme.colors.primary} source="account-box" size={24} />
            &nbsp; Soy responsable de escuela
          </OrganizationMembershipEmptyTextTitle>
          <OrganizationMembershipEmptyText variant="bodyLarge">
            Puedes empezar el proceso de alta directamente desde aquí, o puedes
            contactar con nosotros si necesitas más información.
          </OrganizationMembershipEmptyText>
          <OrganizationMembershipCreateOrganization
            icon="whatsapp"
            mode="elevated"
          >
            Contactar
          </OrganizationMembershipCreateOrganization>
          <OrganizationMembershipCreateOrganization
            icon="plus"
            onPress={onCreateOrganizationPress}
            mode="contained"
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
          <OrganizationMembershipEmptyText variant="bodyLarge">
            Si tienes un código de invitación usa el boton de abajo para
            introducirlo, si tienes un QR puedes escanearlo. Si no tienes nada
            de esto, contacta con el lider de tu escuela para que te invite.
          </OrganizationMembershipEmptyText>

          <OrganizationMembershipCreateOrganization
            textColor={theme.colors.secondary}
            icon="link"
            mode="text"
          >
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
  background-color: ${(props) => props.theme.colors.onPrimary};
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
)<{
  isPrimary?: boolean;
}>`
  color: ${(props) =>
    props.isPrimary
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
`;

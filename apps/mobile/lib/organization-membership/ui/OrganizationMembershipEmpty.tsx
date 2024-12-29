import { spacing } from "@/theme/spacing";
import { router } from "expo-router";
import { Platform, ScrollView, View } from "react-native";
import { Button, Card, Icon, useTheme, Text } from "react-native-paper";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled, { ThemeStyledProps } from "styled-components/native";
import * as Linking from "expo-linking";
import { useUser } from "@clerk/clerk-expo";

interface OrganizationMembershipEmptyProps {
  onCreateOrganizationPress: () => void;
}

export default function OrganizationMembershipEmpty({
  onCreateOrganizationPress,
}: OrganizationMembershipEmptyProps) {
  const theme = useTheme();
  const { user } = useUser();

  const onContactWhatsAppPress = () => {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=+34600200862&text=Hola soy ${user?.fullName} me he registrado en la app y me gustaría recibir más información. Gracias`,
    );
    //
  };

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
            ¡Registra tu mism@ tu escuela! o agenda una reunión con nosotros. Te
            haremos una demo gratuita sin compromiso.
          </OrganizationMembershipEmptyText>
          <OrganizationMembershipCreateOrganization
            icon="calendar"
            mode="elevated"
            onPress={() => router.navigate("/demo-meeting")}
          >
            Agendar una demo
          </OrganizationMembershipCreateOrganization>
          <OrganizationMembershipCreateOrganization
            icon="plus"
            onPress={onCreateOrganizationPress}
            mode="contained"
          >
            Registrar escuela
          </OrganizationMembershipCreateOrganization>
          <OrganizationMembershipEmptyContactContainer>
            <OrganizationMembershipEmptyContactTitle variant="labelLarge">
              ¿Necesitas ayuda?
            </OrganizationMembershipEmptyContactTitle>
            <OrganizationMembershipCreateOrganization
              icon="whatsapp"
              onPress={onContactWhatsAppPress}
              textColor="#0f3928"
              mode="text"
            >
              Contactar por WhatsApp
            </OrganizationMembershipCreateOrganization>
          </OrganizationMembershipEmptyContactContainer>
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
            Si no tienes código de invitación, ni código QR, contacta con el
            lider de tu escuela para que te invite.
          </OrganizationMembershipEmptyText>

          <OrganizationMembershipCreateOrganization
            textColor={theme.colors.secondary}
            icon="keyboard-variant"
            mode="text"
          >
            Introducir código
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

const OrganizationMembershipEmptyContactContainer = styled(View)`
  display: flex;
`;

const OrganizationMembershipEmptyContactTitle = styled(Text)`
  text-align: center;
  margin-top: ${spacing * 2}px;
`;

const OrganizationMembershipEmptyCard = styled(Card)<ThemeStyledProps>`
  padding: ${spacing}px;
  margin: ${spacing}px 0px;
  max-width: 425px;
  background-color: ${(props: ThemeStyledProps) =>
    props.theme.colors.onPrimary};
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

interface OrganizationMembershipEmptyTextTitleProps extends ThemeStyledProps {
  isPrimary?: boolean;
}

const OrganizationMembershipEmptyTextTitle = styled(
  OrganizationMembershipEmptyText,
)<OrganizationMembershipEmptyTextTitleProps>`
  color: ${(props: OrganizationMembershipEmptyTextTitleProps) =>
    props.isPrimary
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
`;

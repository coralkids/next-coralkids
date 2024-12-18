import React, { useState } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import AppLoader from "@/lib/core/ui/AppLoader";
import { Text } from "react-native-paper";
import styled, { ThemeStyledProps } from "styled-components/native";
import {
  SocialLoginButton,
  SocialLoginButtonContent,
  SocialLoginButtonText,
  SocialLoginImageIcon,
} from "../ui/SocialLoginButton";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const router = useRouter();

  const onPress = async (authType: string) => {
    setLoading(true);

    try {
      if (authType === "google") {
        const { createdSessionId, setActive } = await startGoogleAuthFlow();
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.navigate("/(home)");
        }
      } else if (authType === "apple") {
        const { createdSessionId, setActive } = await startAppleAuthFlow();
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.navigate("/(home)");
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
    setLoading(false);
  };

  return (
    <Container>
      {!loading && (
        <>
          <AppLogo
            contentFit="contain"
            source={require("@/assets/icons/logo-negro-degradado.png")} // Ensure the correct path to your logo image file
          />
          <Title variant="titleLarge">Iniciar sesion</Title>
          <Subtitle variant="bodyMedium">Bienvenid@ a Coralkids!</Subtitle>

          <SocialLoginButton
            onPress={() => onPress("google")}
            mode="elevated"
            buttonColor="white"
          >
            <SocialLoginButtonContent>
              <SocialLoginImageIcon
                source={require("@/assets/icons/google.png")}
              />
              <SocialLoginButtonText>
                Continuar con Google
              </SocialLoginButtonText>
            </SocialLoginButtonContent>
          </SocialLoginButton>

          <SocialLoginButton
            mode="elevated"
            buttonColor="white"
            onPress={() => onPress("apple")}
          >
            <SocialLoginButtonContent>
              <AntDesign name="apple1" size={24} color="black" />
              <SocialLoginButtonText>Continuar con Apple</SocialLoginButtonText>
            </SocialLoginButtonContent>
          </SocialLoginButton>
        </>
      )}
      {loading && <AppLoader />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeStyledProps) =>
    theme.colors?.background};
  align-items: center;
  justify-content: center;
  display: flex;
`;

const AppLogo = styled(Image)`
  width: 300px;
  height: 55px;
  background-position: center;
`;

const Title = styled(Text)`
  margin-top: 40px;
  font-weight: 500;
`;

const Subtitle = styled(Text)`
  margin-top: 5px;
  margin-bottom: 10px;
`;

import React, { useState } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import AppLoader from "@/lib/core/ui/AppLoader";
import s, {
  ReactNativePaperCustomTheme,
  ThemeStyledProps,
  ReactNativeStyledInterface,
} from "styled-components/native";

const styled: ReactNativeStyledInterface<ReactNativePaperCustomTheme> = s;

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
        <View style={styles.card}>
          <View
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              contentFit="contain"
              source={require("@/assets/icons/logo-negro-degradado.png")} // Ensure the correct path to your logo image file
              style={styles.logo}
            />
            <Text style={styles.title}>Iniciar sesion</Text>
            <Text style={styles.subtitle}>Bienvenid@ a Coralkids!</Text>

            <TouchableOpacity
              style={styles.buttonGoogle}
              onPress={() => onPress("google")}
            >
              <Image
                style={styles.googleIcon}
                source={require("@/assets/icons/google.png")}
              />
              <Text style={{ ...styles.buttonText, color: "#344054" }}>
                Continuar con Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonApple}
              onPress={() => onPress("apple")}
            >
              <AntDesign name="apple1" size={24} color="black" />
              <Text
                style={{
                  ...styles.buttonText,
                  color: "#344054",
                  marginLeft: 12,
                }}
              >
                Continuar con Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 55,
    backgroundPosition: "center",
    backgroundImage: "url()",
  },
  title: {
    marginTop: 49,
    fontSize: 21,
    fontFamily: "SemiBold",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#000",
    fontFamily: "Regular",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontFamily: "Regular",
    fontSize: 14,
  },
  buttonEmail: {
    backgroundColor: "#0D87E1",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 24,
    minHeight: 44,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "SemiBold",
    fontSize: 14,
  },
  buttonTextWithIcon: {
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#000",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#000",
    fontFamily: "Medium",
  },
  buttonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    paddingHorizontal: 50,
    marginBottom: 12,
    height: 44,
  },
  buttonApple: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 50,
    borderColor: "#D0D5DD",
    marginBottom: 32,
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    color: "#4D9DE0",
    fontFamily: "SemiBold",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});

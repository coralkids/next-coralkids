import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const router = useRouter();

  const onPress = async (authType: string) => {
    try {
      if (authType === "google") {
        const { createdSessionId, setActive } = await startGoogleAuthFlow();
        if (createdSessionId && setActive) {
          setActive({ session: createdSessionId });
          router.navigate("/(home)");
        }
      } else if (authType === "apple") {
        const { createdSessionId, setActive } = await startAppleAuthFlow();
        if (createdSessionId && setActive) {
          setActive({ session: createdSessionId });
          router.navigate("/(home)");
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <SafeAreaView>
          <Image
            source={require("../assets/icons/logo2small.png")} // Ensure the correct path to your logo image file
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to your account</Text>
          <Text style={styles.subtitle}>Welcome! Please login below.</Text>
          <TouchableOpacity
            style={styles.buttonGoogle}
            onPress={() => onPress("google")}
          >
            <Image
              style={styles.googleIcon}
              source={require("../assets/icons/google.png")}
            />
            <Text style={{ ...styles.buttonText, color: "#344054" }}>
              Continue with Google
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
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={{ fontFamily: "Regular", marginRight: 10 }}>
              Don’t have an account?
            </Text>
            <Text>Sign up above.</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    width: "98%",
  },
  logo: {
    width: 74,
    height: 74,
    marginTop: 20,
  },
  title: {
    marginTop: 49,
    fontSize: RFValue(21),
    fontFamily: "SemiBold",
  },
  subtitle: {
    marginTop: 8,
    fontSize: RFValue(14),
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
    fontSize: RFValue(14),
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
    fontSize: RFValue(14),
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
    width: "100%",
    marginBottom: 12,
    height: 44,
  },
  buttonApple: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    width: "100%",
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
  errorText: {
    fontSize: RFValue(14),
    color: "tomato",
    fontFamily: "Medium",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 4,
  },
});

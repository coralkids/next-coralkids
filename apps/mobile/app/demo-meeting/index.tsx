import AuthProtect from "@/lib/core/ui/AuthProtect";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function DemoMeeting() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AuthProtect>
      <Appbar.Header elevated>
        <Appbar.BackAction
          onPress={() =>
            router.canGoBack() ? router.back() : router.navigate("/")
          }
        ></Appbar.BackAction>
        <Appbar.Content title="Agendar reunión"></Appbar.Content>
      </Appbar.Header>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS !== "web" ? (
            <WebView
              style={{ flex: 1 }}
              source={{ uri: "https://calendly.com/r-solerginer/30min" }}
            />
          ) : (
            <iframe
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: theme.colors.background,
              }}
              src="https://calendly.com/r-solerginer/30min"
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProtect>
  );
}

import AuthProtect from "@/lib/core/ui/AuthProtect";
import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function DemoMeeting() {
  const router = useRouter();

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
          <WebView
            style={{ flex: 1 }}
            source={{ uri: "https://calendly.com/r-solerginer/30min" }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProtect>
  );
}

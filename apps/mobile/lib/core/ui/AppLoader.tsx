import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AppLoader = () => (
  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

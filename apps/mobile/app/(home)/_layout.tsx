import AuthProtectedSlot from "@/lib/core/ui/AuthProtectedSlot";
import { Slot } from "expo-router";
import { Appbar } from "react-native-paper";

export default function Layout() {
  return (
    <AuthProtectedSlot>
      <Appbar.Header elevated>
        <Appbar.Content title="Escuelas" />
      </Appbar.Header>
      <Slot />
    </AuthProtectedSlot>
  );
}

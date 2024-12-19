import AuthProtect from "@/lib/core/ui/AuthProtect";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <AuthProtect>
      <Slot />
    </AuthProtect>
  );
}

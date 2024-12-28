import AuthProtect, { ConvexSignedIn } from "@/lib/core/ui/AuthProtect";
import UserProvider from "@/lib/user/providers/UserProvider";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <AuthProtect>
      <ConvexSignedIn>
        <UserProvider>
          <Slot />
        </UserProvider>
      </ConvexSignedIn>
    </AuthProtect>
  );
}

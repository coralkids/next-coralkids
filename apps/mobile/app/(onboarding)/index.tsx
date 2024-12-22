import AuthProtect from "@/lib/core/ui/AuthProtect";
import UserProvider from "@/lib/user/providers/UserProvider";

export default function OnBoarding() {
  return (
    <AuthProtect>
      <UserProvider></UserProvider>
    </AuthProtect>
  );
}

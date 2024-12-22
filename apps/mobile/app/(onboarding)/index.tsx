import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationOnboarding from "@/lib/onboarding/features/OrganizationOnboarding";
import UserProvider from "@/lib/user/providers/UserProvider";

export default function OnBoarding() {
  return (
    <AuthProtect>
      <UserProvider>
        <OrganizationOnboarding />
      </UserProvider>
    </AuthProtect>
  );
}

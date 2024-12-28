import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationOnboarding from "@/lib/organization-onboarding/features/OrganizationOnboarding";
import { OrganizationOnboardingProvider } from "@/lib/organization-onboarding/providers/OrganizationOnboardingProvider";
import UserProvider from "@/lib/user/providers/UserProvider";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";

export default function OnBoarding() {
  const params = useLocalSearchParams<{ id: Id<"organizationOnboarding"> }>();

  return (
    <AuthProtect>
      <UserProvider>
        <OrganizationOnboardingProvider id={params.id}>
          <OrganizationOnboarding />
        </OrganizationOnboardingProvider>
      </UserProvider>
    </AuthProtect>
  );
}

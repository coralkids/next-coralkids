import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationOnboarding from "@/lib/organization-onboarding/features/OrganizationOnboarding";
import { OrganizationOnboardingProvider } from "@/lib/organization-onboarding/providers/OrganizationOnboardingProvider";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";

export default function OnBoarding() {
  const params = useLocalSearchParams<{ id: Id<"organizationOnboarding"> }>();

  return (
    <AuthProtect>
      <OrganizationOnboardingProvider id={params.id}>
        <OrganizationOnboarding />
      </OrganizationOnboardingProvider>
    </AuthProtect>
  );
}

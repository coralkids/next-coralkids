import AuthProtect, { ConvexSignedIn } from "@/lib/core/ui/AuthProtect";
import OrganizationMemberhipHome from "@/lib/organization-membership/features/OrganizationMembershipHome";
import UserProvider from "@/lib/user/providers/UserProvider";

const Home = () => (
  <AuthProtect>
    <ConvexSignedIn>
      <UserProvider>
        <OrganizationMemberhipHome />
      </UserProvider>
    </ConvexSignedIn>
  </AuthProtect>
);

export default Home;

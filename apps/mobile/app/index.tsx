import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationMemberhipHome from "@/lib/organization-membership/features/OrganizationMembershipHome";
import UserProvider from "@/lib/user/providers/UserProvider";

const Home = () => (
  <AuthProtect>
    <UserProvider>
      <OrganizationMemberhipHome />
    </UserProvider>
  </AuthProtect>
);

export default Home;

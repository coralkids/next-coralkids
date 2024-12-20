import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationMemberhipHome from "@/lib/organization-membership/features/OrganizationMembershipHome";
import ActiveOrganizationMembershipProvider from "@/lib/organization-membership/providers/ActiveOrganizationMembershipProvider";
import UserProvider from "@/lib/user/providers/UserProvider";

const Home = () => (
  <AuthProtect>
    <UserProvider>
      <ActiveOrganizationMembershipProvider>
        <OrganizationMemberhipHome />
      </ActiveOrganizationMembershipProvider>
    </UserProvider>
  </AuthProtect>
);

export default Home;

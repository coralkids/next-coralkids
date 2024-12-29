import AuthProtect from "@/lib/core/ui/AuthProtect";
import OrganizationMemberhipHome from "@/lib/organization-membership/features/OrganizationMembershipHome";

const Home = () => (
  <AuthProtect>
    <OrganizationMemberhipHome />
  </AuthProtect>
);

export default Home;

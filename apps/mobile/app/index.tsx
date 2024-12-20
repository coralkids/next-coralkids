import AuthProtect from "@/lib/core/ui/AuthProtect";
import { OrganizationHome } from "@/lib/organization/features/OrganizationHome";
import UserProvider from "@/lib/user/providers/UserProvider";

const Home = () => (
  <AuthProtect>
    <UserProvider>
      <OrganizationHome />
    </UserProvider>
  </AuthProtect>
);

export default Home;

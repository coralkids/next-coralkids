import { AuthProtectedSlot } from "../components/AuthProtectedSlot";
import { BaseLayout } from "../components/BaseLayout";

export default function Layout() {
  return (
    <BaseLayout>
      <AuthProtectedSlot />
    </BaseLayout>
  );
}

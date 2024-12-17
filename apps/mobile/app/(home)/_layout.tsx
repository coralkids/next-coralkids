import { AuthProtectedSlot } from "../components/AuthProtectedSlot";
import { BaseLayout } from "../components/BaseLayout";
import { NotesProvider } from "../providers/NotesProvider";

export default function Layout() {
  return (
    <BaseLayout>
      <NotesProvider>
        <AuthProtectedSlot />
      </NotesProvider>
    </BaseLayout>
  );
}

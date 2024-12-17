import { AuthProtectedSlot } from "../components/AuthProtectedSlot";
import { BaseLayout } from "../components/BaseLayout";
import { CurrentNoteProvider } from "../providers/CurrentNoteProvider";
import { NotesProvider } from "../providers/NotesProvider";

export default function Layout() {
  return (
    <BaseLayout>
      <NotesProvider>
        <CurrentNoteProvider>
          <AuthProtectedSlot />
        </CurrentNoteProvider>
      </NotesProvider>
    </BaseLayout>
  );
}

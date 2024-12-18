import AuthProtectedSlot from "@/lib/core/ui/AuthProtectedSlot";
import NotesProvider from "@/lib/notes/providers/NotesProvider";

export default function Layout() {
  return (
    <NotesProvider>
      <AuthProtectedSlot />
    </NotesProvider>
  );
}

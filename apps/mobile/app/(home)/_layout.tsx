import AuthProtectedSlot from "../components/AuthProtectedSlot";
import NotesProvider from "../providers/NotesProvider";

export default function Layout() {
  return (
    <NotesProvider>
      <AuthProtectedSlot />
    </NotesProvider>
  );
}

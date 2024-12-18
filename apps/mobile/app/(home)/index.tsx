import NotesDashboard from "@/lib/notes/features/NotesDashboard";
import NotesProvider from "@/lib/notes/providers/NotesProvider";

const Home = () => (
  <NotesProvider>
    <NotesDashboard />
  </NotesProvider>
);

export default Home;

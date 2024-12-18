import { useContext } from "react";
import { NotesContext } from "@/lib/notes/providers/NotesProvider";

export const useNotes = () => {
  const notes = useContext(NotesContext);

  return {
    loading: !notes,
    notes: notes,
  };
};

export default useNotes;

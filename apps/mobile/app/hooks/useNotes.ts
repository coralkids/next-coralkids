import { useContext } from "react";
import { NotesContext } from "../providers/NotesProvider";

export const useNotes = () => {
  const notes = useContext(NotesContext);

  return {
    loading: !notes,
    notes: notes,
  };
};

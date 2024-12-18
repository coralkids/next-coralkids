import { useContext } from "react";
import { NoteDetailContext } from "../providers/NoteDetailProvider";

// Hook para usar el contexto
export const useNoteDetail = () => {
  const ctx = useContext(NoteDetailContext);

  if (!ctx) {
    throw new Error("useNoteDetail needs a NoteDetailProvider");
  }

  return ctx;
};

export default useNoteDetail;

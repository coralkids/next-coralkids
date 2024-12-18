import { useContext } from "react";
import { NoteDetailContext } from "../providers/NoteDetailProvider";

// Hook para usar el contexto
export const useNoteDetail = () => {
  const ctx = useContext(NoteDetailContext);

  return ctx;
};

export default useNoteDetail;

import { CurrentNoteContext } from "../providers/CurrentNoteProvider";
import { useContext } from "react";

export const useCurrentNote = () => {
  const note = useContext(CurrentNoteContext);

  return {
    loading: !note,
    note: note,
  };
};

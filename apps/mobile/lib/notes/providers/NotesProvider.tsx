import { api } from "@packages/backend/convex/_generated/api";
import { Doc } from "@packages/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { createContext } from "react";

export const NotesContext = createContext<Doc<"notes">[] | undefined>(
  undefined,
);

export const NotesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const allNotes = useQuery(api.notes.getNotes) || undefined;

  return (
    <NotesContext.Provider value={allNotes}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;

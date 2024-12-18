import React, { createContext } from "react";
import { api } from "@packages/backend/convex/_generated/api";
import { Doc, Id } from "@packages/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const NoteDetailContext = createContext<Doc<"notes"> | undefined>(
  undefined,
);

export const NoteDetailProvider: React.FC<
  React.PropsWithChildren<{
    entityId: Id<"notes">;
  }>
> = ({ entityId, children }) => {
  const data = useQuery(api.notes.getNote, { id: entityId }) || undefined;

  return (
    <NoteDetailContext.Provider value={data}>
      {children}
    </NoteDetailContext.Provider>
  );
};

export default NoteDetailProvider;

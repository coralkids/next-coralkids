import { api } from "@packages/backend/convex/_generated/api";
import { Doc, Id } from "@packages/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useGlobalSearchParams } from "expo-router";
import React, { createContext } from "react";

export const CurrentNoteContext = createContext<Doc<"notes"> | undefined>(
  undefined,
);

export const CurrentNoteProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { id } = useGlobalSearchParams<{ id: Id<"notes"> }>();

  const note = useQuery(api.notes.getNote, { id }) || undefined;

  return (
    <CurrentNoteContext.Provider value={note}>
      {children}
    </CurrentNoteContext.Provider>
  );
};

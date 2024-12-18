import NoteDetail from "@/notes/features/NoteDetail";
import { NoteDetailProvider } from "@/notes/providers/NoteDetailProvider";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function InsideNoteScreen() {
  const params = useLocalSearchParams<{ id: Id<"notes"> }>();

  return (
    <NoteDetailProvider entityId={params.id}>
      <NoteDetail />
    </NoteDetailProvider>
  );
}

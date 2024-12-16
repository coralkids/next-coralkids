import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ConvexClientProvider>
      <Slot />
    </ConvexClientProvider>
  );
}

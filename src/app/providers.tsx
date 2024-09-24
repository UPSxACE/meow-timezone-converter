"use client";

import { DateProvider } from "./_context/date-context";
import { SelectionProvider } from "./_context/selection-context";
import { SongProvider } from "./_context/song-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>
      <DateProvider>
        <SongProvider>{children}</SongProvider>
      </DateProvider>
    </SelectionProvider>
  );
}

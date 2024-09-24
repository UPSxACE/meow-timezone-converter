import { ReactState } from "@/utils/react-state-type";
import { createContext, ReactNode, useState } from "react";
import useSongs from "./use-songs";

export const SongContext = createContext<{
  duration: ReactState<number>;
  songs: ReturnType<typeof useSongs> | null;
  hovering: ReactState<null | string>;
}>({
  duration: [1000, () => {}],
  hovering: [null, () => {}],
  songs: null,
});

export function SongProvider({ children }: { children: ReactNode }) {
  const [duration, setDuration] = useState(1000);
  const [hoveringOne, setHoveringOne] = useState<null | string>(null);
  const state = useSongs();

  //

  return (
    <SongContext.Provider
      value={{
        duration: [duration, setDuration],
        songs: state,
        hovering: [hoveringOne, setHoveringOne],
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

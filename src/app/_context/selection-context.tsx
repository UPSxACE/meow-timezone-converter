import { ReactState } from "@/utils/react-state-type";
import { createContext, ReactNode, useState } from "react";

export enum Selection {
  empty = "",
  ace = "ace",
  aki = "aki",
  sheo = "sheo",
  jyoru = "jyoru",
  lyn = "lyn",
}

export const SelectionContext = createContext<ReactState<Selection>>([
  Selection.empty,
  () => {},
]);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>(Selection.empty);

  return (
    <SelectionContext.Provider value={[selection, setSelection]}>
      {children}
    </SelectionContext.Provider>
  );
}

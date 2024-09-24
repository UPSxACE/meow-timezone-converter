import { ReactState } from "@/utils/react-state-type";
import { createContext, ReactNode, useState } from "react";

export const DateContext = createContext<
  ReactState<{ date: Date | undefined; bias: number }>
>([{ date: undefined, bias: 0 }, () => {}]);

export function DateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    date: Date | undefined;
    bias: number;
  }>({
    date: undefined,
    bias: 0,
  });

  return (
    <DateContext.Provider value={[state, setState]}>
      {children}
    </DateContext.Provider>
  );
}

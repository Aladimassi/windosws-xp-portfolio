import { createContext, useCallback, useContext, type ReactNode } from "react";

type BsodContextValue = { triggerBsod: () => void };

const BsodContext = createContext<BsodContextValue>({ triggerBsod: () => {} });

export function BsodProvider({
  children,
  onTrigger,
}: {
  children: ReactNode;
  onTrigger: () => void;
}) {
  const triggerBsod = useCallback(() => onTrigger(), [onTrigger]);
  return <BsodContext.Provider value={{ triggerBsod }}>{children}</BsodContext.Provider>;
}

export function useBsod() {
  return useContext(BsodContext);
}

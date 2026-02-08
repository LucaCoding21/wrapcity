"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

interface PreloaderContextType {
  isLoading: boolean;
  setComplete: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoading: true,
  setComplete: () => {},
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export default function PreloaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const setComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoading, setComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

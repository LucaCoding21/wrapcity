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
  setVideoReady: () => void;
  isVideoReady: boolean;
  isAnimationDone: boolean;
  setAnimationDone: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoading: true,
  setComplete: () => {},
  setVideoReady: () => {},
  isVideoReady: false,
  isAnimationDone: false,
  setAnimationDone: () => {},
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const setComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const setAnimationDone = useCallback(() => {
    setIsAnimationDone(true);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoading, setComplete, setVideoReady, isVideoReady, isAnimationDone, setAnimationDone }}>
      {children}
    </PreloaderContext.Provider>
  );
}

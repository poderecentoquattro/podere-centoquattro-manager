"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type UIContextType = {
  hideBottomBar: boolean;
  setHideBottomBar: (value: boolean) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideBottomBar, setHideBottomBar] =
    useState(false);

  return (
    <UIContext.Provider
      value={{
        hideBottomBar,
        setHideBottomBar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error(
      "useUI deve essere usato dentro UIProvider"
    );
  }

  return context;
}
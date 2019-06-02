import React, { createContext } from "react";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const value = {
    theme: props.theme
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

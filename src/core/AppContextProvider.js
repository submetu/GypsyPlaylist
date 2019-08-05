import React, { createContext, useReducer, useMemo } from "react";
import { reducer, initialState } from "./reducer";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({
      theme: props.theme,
      state,
      dispatch
    }),
    [props.theme, state]
  );
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

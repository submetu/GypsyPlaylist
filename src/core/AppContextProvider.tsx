import React, { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { ThemeType } from 'themes';
import { AppActionType, AppStateType, initialState, reducer } from './reducer';

interface AppContextType {
  state: AppStateType;
  dispatch: React.Dispatch<AppActionType>;
  theme: ThemeType | any;
}

const initialAppContext = {
  dispatch: () => {},
  state: initialState,
  theme: {},
};
export const AppContext = createContext<AppContextType>(initialAppContext);

type AppContextProviderProps = PropsWithChildren<{
  theme: Record<any, any>;
}>;

export function AppContextProvider(props: AppContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({
      dispatch,
      state,
      theme: props.theme,
    }),
    [props.theme, state]
  );
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}

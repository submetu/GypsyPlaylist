import React, {
  createContext,
  useReducer,
  useMemo,
  PropsWithChildren
} from "react";
import { reducer, initialState, AppStateType, AppActionType } from "./reducer";
import { ThemeType } from "themes";

type AppContextType = {
  state: AppStateType;
  dispatch: React.Dispatch<AppActionType> | Function;
  theme: ThemeType | any;
};
const initialAppContext = {
  state: initialState,
  dispatch: () => {},
  theme: {}
};
export const AppContext = createContext<AppContextType>(initialAppContext);

type AppContextProviderProps = PropsWithChildren<{
  theme: Record<any, any>;
}>;

export function AppContextProvider(props: AppContextProviderProps) {
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

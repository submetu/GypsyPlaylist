import React, { useContext, PropsWithChildren } from "react";
import { MainAppBar } from "./MainAppBar";
import { AppContext } from "core/AppContextProvider";
import classNames from "classnames";
import "./Layout.css";

type LayoutProps = PropsWithChildren<{}>;
export function Layout(props: LayoutProps) {
  const { theme } = useContext(AppContext);
  return (
    <div className={classNames("Layout", theme.background)}>
      <MainAppBar className={classNames(theme.MainAppBar, "MainAppBar")} />
      {props.children}
    </div>
  );
}

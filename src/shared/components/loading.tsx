import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppContext } from "../../core/AppContextProvider";
import classNames from "classnames";

type LoadingProps = {
  transparent?: boolean;
  className?: string;
  loadingText?: string;
};
export function Loading(props: LoadingProps) {
  const { theme } = useContext(AppContext);
  return (
    <div
      className={classNames("Loading", !props.transparent && theme.background)}
    >
      <CircularProgress size={42} className={theme.primaryColor} />
      <div className={classNames("Loading_loadingText", props.className || "")}>
        {props.loadingText}
      </div>
    </div>
  );
}

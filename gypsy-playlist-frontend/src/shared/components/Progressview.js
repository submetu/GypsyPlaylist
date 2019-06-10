import React from "react";
import { Loading } from "./loading";

export function ProgressView(props) {
  return props.loading ? (
    <Loading
      transparent={props.transparent}
      loadingText={props.loadingText}
      className={props.className}
    />
  ) : (
    props.children
  );
}

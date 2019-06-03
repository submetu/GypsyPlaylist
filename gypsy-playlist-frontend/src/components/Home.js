import React, { useCallback, useState, useContext } from "react";
import { AppContext } from "../core/AppContextProvider";
import Button from "@material-ui/core/Button";
import { createSpotifyService } from "../services/createSpotifyService";
import { MainAppBar } from "../shared/components/MainAppBar";
import classNames from "classnames";

export function Home() {
  const { theme } = useContext(AppContext);
  const onClick = useCallback(() => {
    createSpotifyService({
      url: "browse/new-releases",
      onSuccess: data => {
        console.log("data");
      }
    });
  }, []);
  return (
    <div className={classNames("Home", theme.background)}>
      <MainAppBar className={classNames(theme.MainAppBar, "MainAppBar")} />
      <div>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}

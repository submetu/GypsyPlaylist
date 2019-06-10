import React, { useEffect, useContext } from "react";
import { AppContext } from "../core/AppContextProvider";
import Button from "@material-ui/core/Button";
import { createSpotifyService } from "../services/createSpotifyService";
import { MainAppBar } from "../shared/components/MainAppBar";
import { Playlists } from "../shared/components/Playlists";
import classNames from "classnames";
import { UPDATE_PLAYLISTS } from "../core/constants";

export function Home() {
  const { theme, state, dispatch } = useContext(AppContext);

  useEffect(() => {
    createSpotifyService({
      url: "me/playlists",
      onSuccess(data) {
        if (!data || !data.items) return;
        dispatch({ type: UPDATE_PLAYLISTS, payload: data.items });
      },
      onError(e) {
        throw new Error(e);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames("Home", theme.background)}>
      <MainAppBar className={classNames(theme.MainAppBar, "MainAppBar")} />
      <div className="container">
        <h1 className={theme.primaryColor}> Your Playlists</h1>
        <Playlists playlists={state.playlists} />
        {/* <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Browse
        </Button> */}
      </div>
    </div>
  );
}

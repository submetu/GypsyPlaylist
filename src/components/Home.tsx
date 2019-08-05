import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../core/AppContextProvider";
import { createSpotifyService } from "../services/createSpotifyService";
import { MainAppBar } from "../shared/components/MainAppBar";
import { Playlists } from "../shared/components/Playlists";
import classNames from "classnames";
import { UPDATE_PLAYLISTS } from "../core/constants";
import { ProgressView } from "../shared/components/Progressview";
import { PlaylistsResponse } from "models/PlayListsModel";

export function Home() {
  const { theme, state, dispatch } = useContext(AppContext);
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);

  useEffect(() => {
    createSpotifyService<PlaylistsResponse>({
      url: "me/playlists",
      onSuccess(data) {
        if (!data || !data.items) return;
        dispatch({ type: UPDATE_PLAYLISTS, payload: data.items });
      },
      onError(e) {
        throw new Error(e);
      },
      onFinally() {
        setIsPlaylistsLoading(false);
      }
    });
  }, [dispatch]);

  return (
    <div className={classNames("Home", theme.background)}>
      <MainAppBar className={classNames(theme.MainAppBar, "MainAppBar")} />
      <div className="container">
        <h1 className={theme.primaryColor}> Your Playlists</h1>
        <ProgressView
          transparent
          className={theme.primaryColor}
          loading={isPlaylistsLoading}
          loadingText={"Loading Playlists..."}
        >
          <Playlists playlists={state.playlists} />
        </ProgressView>
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

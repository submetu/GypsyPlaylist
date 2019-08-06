import { PlaylistsResponse } from 'models/PlayListsModel';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../core/AppContextProvider';
import { UPDATE_PLAYLISTS } from '../core/constants';
import { createSpotifyService } from '../services/createSpotifyService';
import { Playlists } from '../shared/components/Playlists';
import { ProgressView } from '../shared/components/Progressview';

export function Home() {
  const { theme, state, dispatch } = useContext(AppContext);
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);

  useEffect(() => {
    createSpotifyService<PlaylistsResponse>({
      url: 'me/playlists',
      onSuccess(data) {
        if (!data || !data.items) {
          return;
        }
        dispatch({ type: UPDATE_PLAYLISTS, payload: data.items });
      },
      onError(e) {
        throw new Error(e);
      },
      onFinally() {
        setIsPlaylistsLoading(false);
      },
    });
  }, [dispatch]);

  return (
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
    </div>
  );
}

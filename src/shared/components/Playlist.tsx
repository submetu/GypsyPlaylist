import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../core/AppContextProvider";
import { PlaylistType } from "models/PlayListsModel";
import { Link } from "react-router-dom";

export function Playlist({ playlist }: { playlist: PlaylistType }) {
  const { theme } = useContext(AppContext);
  return (
    <Link to={`/playlist-editor/${playlist.id}`}>
      <div className={classNames("Playlist", theme.secondaryBackground)}>
        <img
          className="Playlist_background"
          src={playlist.images[0].url}
          alt="Playlist Background"
        />
        <div className="Playlist_name">{playlist.name}</div>
        <div className={classNames("Playlist_ownerName", theme.primaryColor)}>
          {playlist.owner.display_name}
        </div>
      </div>
    </Link>
  );
}

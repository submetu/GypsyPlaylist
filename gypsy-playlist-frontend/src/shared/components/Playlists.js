import React from "react";
import shortid from "shortid";
import { Playlist } from "./Playlist";

export function Playlists({ playlists }) {
  return (
    <div className="Playlists">
      {playlists.map(playlist => (
        <Playlist playlist={playlist} key={shortid.generate()} />
      ))}
    </div>
  );
}

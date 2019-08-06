import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import { PlaylistType } from 'models/PlayListsModel';
import React, { useCallback, useEffect, useState } from 'react';
import shortid from 'shortid';
import { Playlist } from './Playlist';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '300px',
    [theme.breakpoints.up('sm')]: {},
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export function Playlists(props: { playlists: PlaylistType[] }) {
  const classes = useStyles('');
  const [playlists, setPlaylists] = useState(props.playlists);

  useEffect(() => {
    setPlaylists(props.playlists);
  }, [props.playlists]);

  const onChange = useCallback(
    e => {
      const filteredPlaylists = getFilteredPlaylists(props.playlists, e.target.value);
      setPlaylists(e.target.value ? filteredPlaylists : props.playlists);
    },
    [props.playlists]
  );

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={onChange}
          placeholder="Search Playlists…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
      <div className="Playlists">
        {playlists.map(playlist => (
          <Playlist playlist={playlist} key={shortid.generate()} />
        ))}
      </div>
    </>
  );
}

function getFilteredPlaylists(playlists: PlaylistType[], term: string) {
  const searchTerm = term.toLowerCase();
  return playlists.filter(playlist => {
    const playlistName = playlist.name.toLowerCase();
    const playlistOwner = playlist.owner.display_name.toLowerCase();
    return playlistName.includes(searchTerm) || playlistOwner.includes(searchTerm);
  });
}

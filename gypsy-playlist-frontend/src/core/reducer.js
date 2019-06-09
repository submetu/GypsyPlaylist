import {UPDATE_PLAYLISTS} from './constants';

export const initialState = {
  playlists: []
};

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_PLAYLISTS:
      return {
        playlists: action.payload
      };
    default:
      return initialState;
  }
}

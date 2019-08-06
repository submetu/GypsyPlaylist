import { PlaylistType } from 'models/PlayListsModel';
import { INITIAL_USER, User } from 'models/User';
import { UPDATE_PLAYLISTS, UPDATE_USER } from './constants';

export interface AppStateType {
  playlists: PlaylistType[];
  user: User;
}
export type AppActionType =
  | {
      type: 'UPDATE_PLAYLISTS';
      payload: PlaylistType[];
    }
  | {
      type: 'UPDATE_USER';
      payload: User;
    };

export const initialState: AppStateType = {
  playlists: [],
  user: INITIAL_USER,
};

export function reducer(state: AppStateType, action: AppActionType) {
  switch (action.type) {
    case UPDATE_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return initialState;
  }
}

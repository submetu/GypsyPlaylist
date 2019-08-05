import { UPDATE_PLAYLISTS, UPDATE_USER } from "./constants";
import { User, INITIAL_USER } from "models/User";
import { PlaylistType } from 'models/PlayListsModel';

export type AppStateType = {
  playlists: PlaylistType[];
  user: User;
};
export type AppActionType =
  | {
      type: "UPDATE_PLAYLISTS";
      payload: PlaylistType[];
    }
  | {
      type: "UPDATE_USER";
      payload: User;
    };

export const initialState: AppStateType = {
  playlists: [],
  user: INITIAL_USER
};

export function reducer(state: AppStateType, action: AppActionType) {
  switch (action.type) {
    case UPDATE_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload
      };
    case UPDATE_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload
      };
    default:
      return initialState;
  }
}

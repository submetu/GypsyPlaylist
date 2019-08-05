import { UPDATE_PLAYLISTS, UPDATE_USER } from "./constants";

export const initialState = {
  playlists: [],
  user: {}
};

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload
      };
    case UPDATE_USER:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload
      };
    default:
      return initialState;
  }
}

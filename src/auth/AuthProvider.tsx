import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useCallback
} from "react";
import { Login } from "../components/Login";
import { ProgressView } from "../shared/components/Progressview";
import { AppContext } from "../core/AppContextProvider";
import { UPDATE_USER } from "../core/constants";
import { SpotifyResponse } from "services/createSpotifyService";
import { User } from "models/User";

export const ACCESS_TOKEN = "access_token";

type AuthContextType = {
  logout: () => void;
};
const initialAuthContext: AuthContextType = {
  logout: () => {}
};
export const AuthContext = createContext<AuthContextType>(initialAuthContext);

type AuthProviderProps = { children: JSX.Element };

export function AuthProvider(props: AuthProviderProps) {
  const { dispatch } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ispending, setIsPending] = useState(true);

  const handleUnauthenticatedUser = useCallback(() => {
    window.localStorage.removeItem(ACCESS_TOKEN);
    setIsLoggedIn(false);
  }, []);

  const authContextValue = useMemo(
    () => ({
      logout: handleUnauthenticatedUser
    }),
    [handleUnauthenticatedUser]
  );

  useEffect(() => {
    let queryParams = new URLSearchParams(window.location.search);
    let accessToken =
      window.localStorage.getItem(ACCESS_TOKEN) ||
      queryParams.get("access_token");
    if (accessToken) {
      window.localStorage.setItem(ACCESS_TOKEN, accessToken);
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((resp: SpotifyResponse<User>) => {
          if (resp.status === 401) {
            handleUnauthenticatedUser();
          }
          if (resp.status !== 200) {
            throw new Error(String(resp.status));
          }
          return resp.json();
        })
        .then(user => {
          dispatch({ type: UPDATE_USER, payload: user });
          setIsLoggedIn(true);
        })
        .catch(e => {
          if (e.message === 401) {
            handleUnauthenticatedUser();
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsPending(false);
      console.log("Send to Login");
    }
  }, [dispatch, handleUnauthenticatedUser]);

  return (
    <ProgressView loading={ispending}>
      {isLoggedIn ? (
        <AuthContext.Provider value={authContextValue}>
          {props.children}
        </AuthContext.Provider>
      ) : (
        <Login />
      )}
    </ProgressView>
  );
}
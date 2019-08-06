import { User } from 'models/User';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SpotifyResponse } from 'services/createSpotifyService';
import { Login } from '../components/Login';
import { AppContext } from '../core/AppContextProvider';
import { UPDATE_USER } from '../core/constants';
import { ProgressView } from '../shared/components/Progressview';


export const ACCESS_TOKEN = 'access_token';

interface AuthContextType {
  logout: () => void;
}
const initialAuthContext: AuthContextType = {
  logout: () => null,
};
export const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: JSX.Element;
}

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
      logout: handleUnauthenticatedUser,
    }),
    [handleUnauthenticatedUser]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken =
      window.localStorage.getItem(ACCESS_TOKEN) || queryParams.get('access_token');
    if (accessToken) {
      window.localStorage.setItem(ACCESS_TOKEN, accessToken);
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    }
  }, [dispatch, handleUnauthenticatedUser]);

  return (
    <ProgressView loading={ispending}>
      {isLoggedIn ? (
        <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
      ) : (
        <Login />
      )}
    </ProgressView>
  );
}

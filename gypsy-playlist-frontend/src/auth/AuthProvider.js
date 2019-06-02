import React, { useState, useEffect } from "react";
import { Login } from "../components/Login";
import { ProgressView } from "../shared/components/Progressview";

export const ACCESS_TOKEN = "access_token";

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ispending, setIsPending] = useState(true);

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
        .then(resp => {
          if (resp.status !== 200) {
            throw new Error(resp.status);
          }
          return resp.json();
        })
        .then(data => {
          setIsLoggedIn(true);
          console.log("Send to Home");
        })
        .catch(e => {
          if (e.message == 401) {
            window.localStorage.removeItem(ACCESS_TOKEN);
            setIsLoggedIn(false);
            console.log("Invalid Token");
            console.log("Send to Login");
          }
        })
        .finally(e => {
          setIsPending(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsPending(false);
      console.log("Send to Login");
    }
  }, []);

  return (
    <ProgressView loading={ispending}>
      {isLoggedIn ? props.children : <Login />}
    </ProgressView>
  );
}

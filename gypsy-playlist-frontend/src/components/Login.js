import React, { useCallback } from "react";
import queryString from "querystring";
import Button from "@material-ui/core/Button";

export function Login() {
  const onClick = useCallback(() => {
    fetch("/login", {
      headers: {
        Accept: "*"
      },
      mode: "no-cors",
      credentials: "include",
      cache: "no-cache"
    })
      .then(resp => resp.json())
      .then(data => {
        let baseURL = "https://accounts.spotify.com/authorize?";
        let query = queryString.stringify(data);
        window.location.href = baseURL + query;
      });
  }, []);
  return (
    <div className="Login">
      <div className="Login_spotify">
        <Button variant="contained" color="primary" onClick={onClick}>
          Login
        </Button>
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppContext } from "../core/AppContextProvider";
import classNames from "classnames";
import queryString from "querystring";

export function Login() {
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(AppContext);

  function onClick() {
    setLoading(true);
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
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error);
      });
  }
  console.log("loading: ", loading);

  return (
    <div className={classNames("Login", theme.background)}>
      <div className="Login_spotify">
        <Button
          classes={{ disabled: theme.disabled }}
          className={theme.button}
          disabled={loading}
          size="large"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          <PersonIcon />
          Login
        </Button>
        {loading && (
          <CircularProgress size={24} className={theme.primaryColor} />
        )}
      </div>
    </div>
  );
}

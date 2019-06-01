import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import queryString from "querystring";
import { Switch, Route } from 'react-router-dom'

const ACCESS_TOKEN = "access_token";

const _parseJSON = function(response) {
  console.log("response: ", response.text());
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {};
  });
};
function App() {
  let queryParams = new URLSearchParams(window.location.search);
  let accessToken =
    window.localStorage.getItem(ACCESS_TOKEN) ||
    queryParams.get("access_token");
  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        console.log(data);
        console.log("Send to Home");
      })
      .catch(e => {
        if (e.message == 401) {
          window.localStorage.removeItem(ACCESS_TOKEN);
          console.log("Invalid Token");
          console.log("Send to Login");
        }
      });
  } else {
    console.log("Send to Login");
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>

      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/roster" component={Roster} />
        <Route path="/schedule" component={Schedule} />
      </Switch> */}
      <button
        onClick={() => {
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
              console.log(baseURL + query);
              window.location.href = baseURL + query;
            });
        }}
      >
        LOGIN
      </button>
    </div>
  );
}

export default App;

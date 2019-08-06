import React from "react";
import { createBrowserHistory } from "history";
import "./App.css";
import "./shared";
import "./components";
import { Home } from "./components/Home";
import { AuthProvider } from "./auth/AuthProvider";
import { AppContextProvider } from "./core/AppContextProvider";
import { useTheme } from "./themes";
import { Router, Route } from "react-router";
import { PlaylistEditor } from "components/PlaylistEditor";
import { Layout } from "shared/components/Layout";

const history = createBrowserHistory();
function App() {
  const [currentTheme] = useTheme();

  return (
    <div className="App">
      <Router history={history}>
        <AppContextProvider theme={currentTheme}>
          <AuthProvider>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route path="/playlist-editor/:id" component={PlaylistEditor} />
            </Layout>
          </AuthProvider>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;

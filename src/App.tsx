import React from "react";
import { createBrowserHistory } from 'history'
import "./App.css";
import "./shared";
import "./components";
import { Home } from "./components/Home";
import { AuthProvider } from "./auth/AuthProvider";
import { AppContextProvider } from "./core/AppContextProvider";
import { useTheme } from "./themes";
import { Router, Route } from "react-router";

const history = createBrowserHistory();
function App() {
  const [currentTheme] = useTheme();

  return (
    <div className="App">
      <Router history={history}>
        <AppContextProvider theme={currentTheme}>
          <AuthProvider>
            <Route path="/" component={Home} />
          </AuthProvider>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;

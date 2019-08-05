import React from "react";
import "./App.css";
import "./shared";
import "./components";
import { Home } from "./components/Home";
import { AuthProvider } from "./auth/AuthProvider";
import { AppContextProvider } from "./core/AppContextProvider";
import { useTheme } from "./themes";

function App() {
  const [currentTheme] = useTheme();

  return (
    <div className="App">
      <AppContextProvider theme={currentTheme}>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;

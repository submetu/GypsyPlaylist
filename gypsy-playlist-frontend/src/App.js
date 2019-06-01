import React, { useState } from "react";
import "./App.css";
import "./shared";
import "./components";
import { Home } from "./components/Home";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Home />
      </AuthProvider>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import './components';
import { Home } from './components/Home';
import { AppContextProvider } from './core/AppContextProvider';
import './shared';
import { useTheme } from './themes';

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

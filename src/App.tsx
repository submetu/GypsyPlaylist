import { PlaylistEditor } from 'components/PlaylistEditor';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router';
import { Layout } from 'shared/components/Layout';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import './components';
import { Home } from './components/Home';
import { AppContextProvider } from './core/AppContextProvider';
import './shared';
import { useTheme } from './themes';

const history = createBrowserHistory();
function App() {
  const [currentTheme] = useTheme();

  return (
    <div className="App">
      <Router history={history}>
        <AppContextProvider theme={currentTheme}>
          <AuthProvider>
            <Layout>
              <Route exact={true} path="/" component={Home} />
              <Route path="/playlist-editor/:id" component={PlaylistEditor} />
            </Layout>
          </AuthProvider>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;

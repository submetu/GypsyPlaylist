import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { useTheme } from '../themes';
import { AppContextProvider } from 'core/AppContextProvider';
import { AuthProvider } from 'auth/AuthProvider';
import { Layout } from 'shared/components/Layout';
import { authenticateUser } from './authenticateUser';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...customRender(<Router history={history}>{ui}</Router>),
    history,
  };
}

const AllTheProviders = ({ children }) => {
  const [currentTheme] = useTheme();
  return (
    <AppContextProvider theme={currentTheme}>
      <AuthProvider>
        <Layout>{children}</Layout>
      </AuthProvider>
    </AppContextProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render, renderWithRouter, authenticateUser };

import React from 'react';
import App from './App';
import fetchMock from 'fetch-mock';
import { render, getByLabelText, fireEvent, waitForElement } from 'test-utils';
import queryString from 'querystring';
import { INITIAL_USER } from 'models/User';
import { AuthProvider } from 'auth/AuthProvider';

let AppContainer;
beforeEach(() => {
  AppContainer = render(<App />);

  //Workaround for window.location.href bug in jest
  //https://github.com/facebook/jest/issues/5124
  global.window = Object.create(window);
  const url = 'http://dummy.com';
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
  });
});
afterEach(fetchMock.reset);

it('renders the Login button', () => {
  const { container } = AppContainer;
  const LoginButton = getByLabelText(container, 'Login Button');
  expect(LoginButton).toBeTruthy();
});

it('Redirects to the Home page after receiving access token', done => {
  const dummyResponse = {
    access_token: '1',
  };
  fetchMock.get('/login', dummyResponse);
  const { container } = AppContainer;
  const LoginButton = getByLabelText(container, 'Login Button');
  fireEvent.click(LoginButton);
  //Simulating async await because there is no viusal element on
  // the screen that we can wait for
  setTimeout(() => {
    const baseURL = 'https://accounts.spotify.com/authorize?';
    const query = queryString.stringify(dummyResponse);
    expect(window.location.href).toEqual(baseURL + query);
    done();
  }, 1);
});

it('Logins successfully when an access token is present', async () => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: () => '1',
      setItem: () => '1',
    },
  });
  expect(window.localStorage.getItem()).toBe('1');
  const headers = { Authorization: `Bearer 1` };
  const options = { headers };

  fetchMock.get('https://api.spotify.com/v1/me', INITIAL_USER, options);
  fetchMock.get('https://api.spotify.com/v1/me/playlists', []);

  const { queryByText } = render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  //Wait for Home page to be loaded
  await waitForElement(() => queryByText(/Your Playlists/i));
});

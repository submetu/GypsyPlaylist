import React from 'react';
import App from './App';
import fetchMock from 'fetch-mock';
import { render, getByLabelText, fireEvent } from 'test-utils';
import queryString from 'querystring';

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

it('redirects to the Home page with the expected access token', done => {
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

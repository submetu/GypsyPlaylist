import fetchMock from 'fetch-mock';
import { INITIAL_USER } from 'models/User';

export function authenticateUser(user = INITIAL_USER, playlists = []) {
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

  fetchMock.get('https://api.spotify.com/v1/me', user, options);
  fetchMock.get('https://api.spotify.com/v1/me/playlists', playlists);

  return fetchMock.reset;
}

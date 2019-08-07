import React from 'react';
import { Home } from './Home';
import { renderWithRouter } from 'test-utils';

it('renders <Home/> without crashing', async () => {
  const { queryByText } = renderWithRouter(<Home />, { router: '/' });

  const PlaylistHeading = queryByText(/your playlists/i);

  expect(PlaylistHeading).toBeTruthy();
});

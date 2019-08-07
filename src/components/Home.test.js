import React from 'react';
import { Home } from './Home';
import { renderWithRouter, authenticateUser, waitForElement } from 'test-utils';

it('renders <Home/> without crashing', async () => {
  const reset = authenticateUser();

  const { queryByText } = renderWithRouter(<Home />, { router: '/' });

  //Wait for Home page to be loaded
  await waitForElement(() => queryByText(/your playlists/i));

  reset();
});

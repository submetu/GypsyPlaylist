import React from 'react';
import { PlaylistEditor } from './PlaylistEditor';
import { renderWithRouter, authenticateUser } from 'test-utils';

it('renders <PlaylistEditor/> without crashing', () => {
  authenticateUser();
  renderWithRouter(<PlaylistEditor />, {
    router: '/playlist-editor',
  });
});

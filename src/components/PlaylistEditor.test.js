import React from 'react';
import { PlaylistEditor } from './PlaylistEditor';
import { renderWithRouter } from 'test-utils';

it('renders <PlaylistEditor/> without crashing', () => {
  renderWithRouter(<PlaylistEditor />, {
    router: '/playlist-editor',
  });
});

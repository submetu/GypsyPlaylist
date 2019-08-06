# GypsyPlaylist

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![Build Status](https://travis-ci.org/submetu/GypsyPlaylist.svg?branch=master)](https://travis-ci.org/submetu/GypsyPlaylist) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)


An open source project for creating playlists tailored for your activities.

This is a project in development.
I am using the Spotify API for authentication and content.

So to use this application, you need a spotify account

This web app will allow users to create different activities such as Travel trips, Gym session, Jogging and assign particular playlists to them.

Playlists can be edited, removed or created with this application. (Still in development)


## Run the project

### Start the backend
- Go to https://github.com/submetu/GypsyPlaylist-backend
- Clone the repo
- In the cloned directory, open up the terminal, and type the following commands:

```
export CLIENT_ID={your_client_id}
export CLIENT_SECRET={your_client_secret}
```
Optional:

```
export REDIRECT_URI=http://localhost:8888/callback
export CLIENT_URL={your_frontend_url}
```

- Then run `npm start`

### Start the Frontend
- Clone this repository
- In the cloned directory, run `yarn install && yarn start`
- Make sure that the backend instance is running otherwise you won't be able to login via spotify

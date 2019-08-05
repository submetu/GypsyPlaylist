# GypsyPlaylist

An open source project for creating playlists tailored for your activities

This is a project in development.
I am using the Spotify API for authentication and content.

This web app will allow users to create different activities such as Travel trips, Gym session, Jogging and assign particular playlists to them.

Users will then be able to see their playlists in their spotify application.

## Run the project

- Open up the terminal, and type the following commands:

```
export CLIENT_ID={your_client_id}
export CLIENT_SECRET={your_client_secret}
```

Optional:

```
export REDIRECT_URI=http://localhost:8888/callback
export CLIENT_URL={your_frontend_url}
```

- Go to gypsy-playlist-backend and run `node app.js`
- Open up another terminal instance, navigate to gypsy-playlist-frontend and run `npm start`

import { ACCESS_TOKEN } from "../auth/AuthProvider";

export function createSpotifyService({
  url,
  method,
  body,
  onSuccess,
  onError,
  onFinally
}) {
  const baseURL = "https://api.spotify.com/v1";
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    sendToLogin();
  }
  fetch(`${baseURL}/${url}`, {
    method: method || "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body
  })
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
    .then(data => onSuccess && onSuccess(data))
    .catch(e => {
      if (e.message == 401) {
        return sendToLogin();
      }
      onError && onError(e);
    })
    .finally(() => onFinally && onFinally());
}

function sendToLogin() {
  window.location.href = "/";
}

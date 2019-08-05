import { ACCESS_TOKEN } from "../auth/AuthProvider";

export type SpotifyServiceType<DataType> = {
  url: string;
  method?: string;
  body?: BodyInit;
  onSuccess: (data: DataType) => void;
  onError: (data: any) => void;
  onFinally: () => void;
};

export type SpotifyResponse<DataType> = {
  status: number;
  json: () => Promise<DataType>;
};

export function createSpotifyService<DataType>({
  url,
  method,
  body,
  onSuccess,
  onError,
  onFinally
}: SpotifyServiceType<DataType>) {
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
    .then((resp: SpotifyResponse<DataType>) => {
      if (resp.status !== 200) {
        throw new Error(String(resp.status));
      }
      return resp.json();
    })
    .then((data: DataType) => onSuccess && onSuccess(data))
    .catch(e => {
      if (e.message === 401) {
        return sendToLogin();
      }
      onError && onError(e);
    })
    .finally(() => onFinally && onFinally());
}

function sendToLogin() {
  window.location.href = "/";
}

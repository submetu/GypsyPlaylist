import { ACCESS_TOKEN } from '../auth/AuthProvider';

export interface SpotifyServiceType<DataType> {
  url: string;
  method?: string;
  body?: BodyInit;
  onSuccess: (data: DataType) => void;
  onError: (data: any) => void;
  onFinally: () => void;
}

export interface SpotifyResponse<DataType> {
  status: number;
  json: () => Promise<DataType>;
}

export function createSpotifyService<DataType>({
  url,
  method,
  body,
  onSuccess,
  onError,
  onFinally,
}: SpotifyServiceType<DataType>) {
  const baseURL = 'https://api.spotify.com/v1';
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    sendToLogin();
  }
  fetch(`${baseURL}/${url}`, {
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: method || 'GET',
  })
    .then((resp: SpotifyResponse<DataType>) => {
      if (resp.status !== 200) {
        throw new Error(String(resp.status));
      }
      return resp.json();
    })
    .then((data: DataType) => onSuccess(data))
    .catch(e => {
      if (e.message === 401) {
        return sendToLogin();
      }
      onError(e);
    })
    .finally(() => onFinally && onFinally());
}

function sendToLogin() {
  window.location.href = '/';
}

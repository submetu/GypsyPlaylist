export interface PlaylistsResponse {
  href: string;
  items: PlaylistType[];
  limit: number;
  next: number | null;
  offset: number;
  previous: number | null;
  total: number;
}

interface PlaylistImage {
  url: string;
  height: number;
  width: number;
}
interface PlaylistOwner {
  display_name: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  type: string;
  uri: string;
}
export interface PlaylistType {
  name: string;
  images: PlaylistImage[];
  owner: PlaylistOwner;
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

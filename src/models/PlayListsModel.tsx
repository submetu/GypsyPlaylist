export type PlaylistsResponse = {
  href: string;
  items: PlaylistType[];
  limit: number;
  next: number | null;
  offset: number;
  previous: number | null;
  total: number;
};

type PlaylistImage = {
  url: string;
  height: number;
  width: number;
};
type PlaylistOwner = {
  display_name: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  type: string;
  uri: string;
};
export type PlaylistType = {
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
};

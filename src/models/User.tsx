export interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      height: number | null;
      url: string;
      width: number | null;
    }
  ];
  product: string;
  type: string;
  uri: string;
}

export const INITIAL_USER: User = {
  country: '',
  display_name: '',
  email: '',
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: '',
  },
  followers: {
    href: null,
    total: 18,
  },
  href: '',
  id: '1',
  images: [
    {
      height: null,
      url: '',
      width: null,
    },
  ],
  product: '',
  type: '',
  uri: '',
};

export type ShortLinkVisit = {
  visitedAt: string;
};

export type ShortLink = {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
  visits: ShortLinkVisit[];
};

export type ShortenValues = {
  originalUrl: string;
};

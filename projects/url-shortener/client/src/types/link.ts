export type Visit = {
  visitedAt: string;
};

export type LinkItem = {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
  expiresAt: string | null;
  visits: Visit[];
};

export type ShortenFormValues = {
  originalUrl: string;
  expiresAt: string;
};
